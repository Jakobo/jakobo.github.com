import React from "react"
import MediumArticle from "../medium_article"
import { getAltImages } from "../../../data/medium"

const Manifesto = (props) => {
  const { color, variant } = props

  const source = "/manifesto"
  const title = "A Manifesto"
  const image = "https://cdn-images-1.medium.com/fit/t/3200/1344/0*MkbYxiuXlwbg8hGR.jpeg"
  const altImages = getAltImages(image)
  const summary = "...a manifesto is a powerful way to communicate your values and beliefs."

  // const { source, title, image, altImages, summary, color, variant, loadData, ready } = props
  return <MediumArticle source={source} title={title} image={image} altImages={altImages} summary={summary} />
}

export default Manifesto
