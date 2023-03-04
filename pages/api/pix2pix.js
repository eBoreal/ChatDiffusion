const banana = require("@banana-dev/banana-dev")

const apiKey = process.env.BANANA_API_KEY
const modelKey = process.env.BANANA_PIX2PIX_MODEL_KEY
const just_test_img = (process.env.JUST_TEST_IMAGE == 'true') ? true : false
// const use_local = (process.env.USE_LOCAL == 'true') ? true : false


const makeModelInputObject = (body) => {
  return {
      'image': body.images[0].image,
      'prompt': body.prompt,
      'steps': body.steps,
      'image_cfg_scale': body.image_cfg_scale/10,
      'text_cfg_scale': body.text_cfg_scale,
      'randomize_cfg': body.randomize_cfg,
      'randomize_seed': true,
      'test_mode': just_test_img,
      'toDataUrl': true
  }
}


const makeMessageImages = (modelOutputs) => {
  return [
    {
      image: modelOutputs[0].image,
      seed: 23,
      id: "success"
    }
  ]
}

export default async function handler(
  req,
  res
) { 

    switch (req.method) {
      case 'GET':
        return res.status(500)
      case 'POST':
        let results;
        try {
          let body;
          if (config.runtime == 'nodejs') {
            body = req.body
          } else {
            body = await req.json();
          }
          
          if (!body.images || body.images.length == 0) {
            console.log("need input image for a pix2pix job")
            return res.status(500).end()
          }
          
          const modelInputs = makeModelInputObject(body)
                    
          // for debug
          // return res.status(504).end()

          results = await banana.run(apiKey, modelKey, modelInputs)

          let images;
          if (!results || !results.modelOutputs) {
            console.log("banana error: ", results)
            return res.status(500).end()
          } 
          
          print(results)
          
          // images = makeMessageImages(results.modelOutputs)

          // console.log("Received: ", results.modelOutputs)

          return res.status(200).json(results.modelOutputs)

        } catch (e) {
          console.log("pix2pix failed: ", e);
          return res.status(500).end()
        }
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


// under edge-runtime
// return new Response(null, { status: 400, statusText: "Bad Request" });
// return new Response(JSON.stringify(images), { status: 200 });
// return new Response(null, { status: 500, statusText: `Banana Error` });
