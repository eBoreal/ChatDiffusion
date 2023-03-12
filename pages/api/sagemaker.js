const banana = require("@banana-dev/banana-dev")
//import { ImageArtifact } from "../../components/Message";

const apiKey = process.env.BANANA_API_KEY
const modelKey = process.env.BANANA_PIX2PIX_MODEL_KEY
const just_test_img = (process.env.JUST_TEST_IMAGE == 'true') ? true : false
// const use_local = (process.env.USE_LOCAL == 'true') ? true : false


const makeModelInputObject = (body) => {

  const b64_string = body.images[0].image.image.split(",")[1]

  return {
    "image_id": body.image_id,
    "user_name": body.user_name,
    "model_inputs": {
      "prompt": body.prompt,
      "steps": body.steps,
      "image_cfg_scale": body.image_cfg_scale,
      "text_cfg_scale": body.text_cfg_scale,
      "num_images_per_prompt": 1,
      "test_mode": just_test_img,
      "image": b64_string,
      'randomize_seed': true,
      'toDataUrl': false
    }
  }
}

const testImage=  {
  id: '',
  parenteImageId: '',
  user_name: '',
  image: {
    prompt: '',
    seed: 42,
    text_cfg_scale: 1,
    image_cfg_scale: 1,
    steps: 1,
    image: ""
  }
}


// const makeMessageImages = (modelOutputs) => {
//   return [
//     {
//       image: modelOutputs[0].image,
//       seed: 23,
//       id: "success"
//     }
//   ]
// }

export default async function handler(
  req,
  res
) { 
    let results;
    try {         
      let body;
      if (config.runtime == 'nodejs') {
        body = req.body
      } else {
        body = await req.json();
      }

      console.log("REQUEST")

      
      if (!body.images || body.images.length == 0) {
        console.log("need input image for a pix2pix job")
        return res.status(500).end()
      }

      const modelInputs = makeModelInputObject(body)

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(modelInputs);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        const response = await fetch("https://bptbqjnou7.execute-api.us-east-1.amazonaws.com/test/generateV1", requestOptions)
          
        if (!response) {
          console.log("server error: ", response)
          return res.status(500).end()
        } 
        
        const responseObj = await response.json() // {'image_id', 'user_name', 'image': {'seed', 'text_cfg_scale', 'image_cfg_scale', 'steps', 'image' } }
        responseObj.image.image = `data:image/jpeg;base64,${responseObj.image.image}`
        // TEST
        // const imageObj = testImage
        // imageObj.image = modelInputs.model_inputs.image

        return res.status(200).json(responseObj)
      
      } catch (error) {
        console.log('response error', error)
        return res.status(500).end()
      }
  
    
    } catch (error) {
      console.log('app request error', error)
      return res.status(500).end()
    }

}

export const config = {
  runtime: 'nodejs',
  api: {
    bodyParser: {
        sizeLimit: '4mb' // Set desired value here
    }
}
}