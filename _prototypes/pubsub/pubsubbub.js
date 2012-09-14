// this assumes the existence of jQuery. For simplicity, I've the only part I was using, trim()
jQuery = {
  trim: function(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
};


var extractSimpleConfig = (function($) {
  
  /*
  Tokenizer - modified to return Tokenizer Class
  Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
  Dual licensed under MIT and GPL.
  */
  var Tokenizer = (function(){var T=function(a,b){if(!(this instanceof T))return new T(a,onEnd,onFound);this.tokenizers=a.splice?a:[a];if(b)this.doBuild=b};T.prototype={parse:function(a){this.src=a;this.ended=0;this.tokens=[];do this.next();while(!this.ended);return this.tokens},build:function(a,b){if(a)this.tokens.push(!this.doBuild?a:this.doBuild(a,!!b,this.tkn))},next:function(){var b=this,c;b.findMin();c=b.src.slice(0,b.min);b.build(c,0);b.src=b.src.slice(b.min).replace(b.tkn,function(a){b.build(a,1);return''});if(!b.src)b.ended=1},findMin:function(){var a=this,i=0,b,c;a.min=-1;a.tkn='';while((b=a.tokenizers[i++])!==undefined){c=a.src[b.test?'search':'indexOf'](b);if(c!=-1&&(a.min==-1||c<a.min)){a.tkn=b;a.min=c}}if(a.min==-1)a.min=a.src.length}};return T})();
  
  var BUBBLE_REGEX      = /=\^/,
      TOKENS            = ["<=^>", "<^=>", "<=^", "^=>", "<=>", "<=", "=>"],
      DUAL_STMT_REGEX   = new RegExp([
                            "(",
                              "(?:", TOKENS.join(")|(?:").replace("^", "\\^"), ")",
                            ").+(",
                              "(?:", TOKENS.join(")|(?:").replace("^", "\\^"), ")",
                            ")"
                          ].join("")),
      TOKEN_REGEX       = new RegExp([
                            "(",
                              "(?:", TOKENS.join(")|(?:").replace("^", "\\^"), ")",
                            ")"
                          ].join("")),
      OPTIONS_REGEX     = /\((.+)\)/
  
  return function extractSimpleConfig(text) {
    var data = {}
    var subs = [],
        pubs = [],
        bubs = BUBBLE_REGEX.test(text),
        last = "",
        pubNext = false,
        subNext = false,
        name = false,
        rawName = false,
        simpleOptionsMatch = null,
        simpleOptions = {},
        leftMode = DUAL_STMT_REGEX.test(text),
        tokenizer = new Tokenizer([TOKEN_REGEX], handleTokenMatch);
    
    // extract all the pieces, populates variables above
    tokenizer.parse(text);
    
    // handle simpleConfig ()
    simpleOptionsMatch = rawName.match(OPTIONS_REGEX);
    
    // if there are no simpleOptions, then we are done. The name doesn't need
    // updating, and we can ship the payload as-is
    if (simpleOptionsMatch === null) {
      name = rawName;
      return createPayload();
    }

    // name is minus that simpleOptionsMatch string
    name = rawName.replace(simpleOptionsMatch[0], "");
    
    // simple options require splitting into key-value pairs
    for (var i = 0, opts = simpleOptionsMatch[1].split(','), len = opts.length; i < len; i++) {
      item = opts[i].split("=");
      key = $.trim(""+item[0]);
      val = (typeof(item[1]) === "undefined") ? true : $.trim(""+item[1]) || true;
      simpleOptions[key] = val
    }
    
    return createPayload();

    /**
     * Creates a payload of the various components
     * returns them as an object literal
     */
    function createPayload() {
      return {
        name: name,
        originalName: rawName,
        publish: pubs,
        subscribe: subs,
        bubbles: bubs,
        options: simpleOptions
      };
    }

    /*
    * Works with the tokenizer to handle matches
    * @param token the matching token from tokenizer
    * @param isDirector the token split string (if token is the string)
    * @return null
    */
    function handleTokenMatch(token, isDirector) {
      // clean up last and token
      last = $.trim(last);
      token = $.trim(token);
      
      // we have to handle a pair of switch statements
      // if isDirector is set, then we are on a token and need to determine
      // if we are on the left or the right side of the control name.
      // once inside, we can then use the switch statement to determine where
      // the controlname should be pushed to.
      if (isDirector) {
        // reset next calls
        pubNext = subNext = false;
        if (leftMode) {
          // left mode: #target <=^> ui:Control
          switch(token) {
            case "<=": // pub
            case "<^=": // pubbub
              pubs.push(last);
              break;
            case "=>": // sub
            case "=^>": // subbub
              subs.push(last);
              break;
            case "<=>": // pubsub
            case "<=^>": // pubsubbub
              pubs.push(last);
              subs.push(last);
              break;
          }
        }
        else {
          // right mode: ui:Control <=^> #target
          switch(token) {
            case "<=": // sub
            case "<^=": // subbub
              subNext = true;
              break;
            case "=>": // pub
            case "=^>": // pubbub
              pubNext = true;
              break;
            case "<=>": // pubsub
            case "<=^>": // pubsubbub
              pubNext = true;
              subNext = true;
              break;
          }
        }
        leftMode = false;
        last = "";
      }
      else {
        if (pubNext) {
          pubs.push($.trim(token));
        }
        if (subNext) {
          subs.push($.trim(token));
        }
        if (!leftMode && !rawName) {
          rawName = token;
        }
        
        // reset for next sequence
        pubNext = subNext = false;
        last = token;
      }
    }
  }
})(jQuery);
