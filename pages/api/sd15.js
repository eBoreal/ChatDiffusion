const banana = require("@banana-dev/banana-dev")

const apiKey = process.env.BANANA_API_KEY
const modelKey = process.env.BANANA_SD15_MODEL_KEY

const makeModelInputObject = (body) => {
  return {
      'prompt': body.prompt,
      'height': body.height,
      'width': body.width,
      'steps': body.steps,
      'guidance_scale': body.text_cfg_scale,
      'seed': 42
  }
}


const makeMessageImages = (modelOutputs) => {
  return [
    {
      image: 'data:image/jpeg;base64,' + modelOutputs[0].image_base64,
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
          
          if (!body.prompt) {
            console.log("need prompting for a stable diffusion job")
            return res.status(500).end()
          }
          
          const modelInputs = makeModelInputObject(body)
          
          //   console.log("asking SD 15 ", modelInputs)

          console.log(body.prompt)

          results = await banana.run(apiKey, modelKey, modelInputs)

          //   console.log(results)

          let images;
          if (!results || !results.modelOutputs) {
            console.log("banana error: ", results)
            return res.status(500).end()
          } 
          
          images = makeMessageImages(results.modelOutputs)

          return res.status(200).json(images)

        } catch (e) {
          console.log(e);
          return res.status(500).end()
        }
    }
}

export const config = {
  runtime: 'nodejs',
}


// under edge-runtime
// return new Response(null, { status: 400, statusText: "Bad Request" });
// return new Response(JSON.stringify(images), { status: 200 });
// return new Response(null, { status: 500, statusText: `Banana Error` });
