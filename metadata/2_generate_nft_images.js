const fs = require("fs");
const images = require("images");

METADATA_FILE_PATH = "metadata-all.json";
TRAITS_IMAGES_PATH = "./images";
NFT_IMAGES_DIR = "./images_nft";

async function main() {
  let allMetadata = JSON.parse(fs.readFileSync(METADATA_FILE_PATH));

  allMetadata.forEach((e, i) => {
    generateNftImg(e, i + 1);
  });

  console.log("Successfully genereted " + allMetadata.length + " nft images");
}

const generateNftImg = function (metadata, filename) {
  if (metadata["attributes"].length > 1) {
    // load the first layer
    let path = TRAITS_IMAGES_PATH +
      "/" +
      metadata["attributes"][0]["value"] +
      "/" +
      metadata["attributes"][1]["trait_type"] +
      "/" +
      metadata["attributes"][1]["value"] +
      ".png"

    if (!fs.existsSync(path)) {
      path = TRAITS_IMAGES_PATH +
        "/" +
        metadata["attributes"][0]["value"] +
        "/" +
        metadata["attributes"][1]["trait_type"] +
        "/" +
        metadata["attributes"][1]["value"] +
        ".PNG"
    }
    let img = images(path);
    // stack other layers in order
    for (let i = 2; i < metadata["attributes"].length; i++) {
      let path = TRAITS_IMAGES_PATH +
        "/" +
        metadata["attributes"][0]["value"] +
        "/" +
        metadata["attributes"][i]["trait_type"] +
        "/" +
        metadata["attributes"][i]["value"] +
        ".png"
      if (!fs.existsSync(path)) {
        path = TRAITS_IMAGES_PATH +
          "/" +
          metadata["attributes"][0]["value"] +
          "/" +
          metadata["attributes"][i]["trait_type"] +
          "/" +
          metadata["attributes"][i]["value"] +
          ".PNG"
      }
      img.draw(images(path), 0, 0);
    }
    img.save(NFT_IMAGES_DIR + "/" + filename + ".png", { quality: 100 }); //Save the image to a file, with the quality of 100
  }

  // images(backgroundImg) //Load image from file
  //   // .size(400)                          //Geometric scaling the image to 400 pixels width
  //   .draw(images(bodyImg), 0, 0) //Drawn logo at coordinates (0,0)
  //   .draw(images(mouthdImg), 0, 0)
  //   .draw(images(eyesImg), 0, 0)
  //   .draw(images(topImg), 0, 0)
  //   .draw(images(potImg), 0, 0)
  //   .draw(images(handsImg), 0, 0)
  //   .save(NFT_IMAGES_DIR + "/" + filename + ".png", { quality: 100 }); //Save the image to a file, with the quality of 100
};

main();
