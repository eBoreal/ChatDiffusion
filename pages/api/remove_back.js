const banana = require("@banana-dev/banana-dev")
//import { ImageArtifact } from "../../components/Message";

const photoroom_api_key = process.env.PHOTOROOM_API_KEY

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

      
      if (!body.images || body.images.length == 0 || !body.images[0]?.image || !body.images[0].image?.image) {
        console.log("need input image for a PHOTOROOM job")
        return res.status(500).end("Problem with request")
      }

      const image_url = body.images[0].image.image.split(",")[1]

      // console.log("SENDING PR: ", image_url)
      // console.log("SENDING PR: ", body.prompt + body.modifiers)

      const formData = new FormData();

      formData.append('image_file', image_url);
      formData.append('format', '');
      formData.append('channels', '');
      formData.append('bg_color', '');
      formData.append('size', '');
      formData.append('crop', '');

      let url = 'https://sdk.photoroom.com/v1/segment';

      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
          'x-api-key': ''
        }
      };

      options.body = formData;

      fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));


      try {
        const response = await fetch("https://beta-sdk.photoroom.com/v1/instant-backgrounds",
        requestOptions)

        if (!response) {
          console.log("server error: ", response)
          return res.status(500).end()
        } 
        
        const pr_img = btoa(response)
        const image = `data:image/jpeg;base64,${pr_img}`

        const responseObj = {
          "image_id": body.image_id,
          "user_name": body.user_name,
          "image": {
            "steps": body.steps,
            "image_cfg_scale": body.image_cfg_scale,
            "text_cfg_scale": body.text_cfg_scale,
            "num_images_per_prompt": 1,
            "image": image,
            "seed": body.seed
          }
        }
        console.log("PHOTOROOM resp: ", image)
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