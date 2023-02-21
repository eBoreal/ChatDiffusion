
# ChatDiffusion
Chat in plain English with the app and have it edit your images as you would like. 

# Instruct Pix2Pix
Instruct Pix2Pix is a model trained to combine the learnings of GPT-3 & Stable Diffusion. How could it go wrong ? 
- The authors start from a caption ex: “photograph of a girl riding a horse”
- Then they use a finetuned GPT-3 to generate instructions (“have her ride a dragon”) and edited captions (“photograph of a girl riding a dragon”) to generate prompts and instructions. 
- From those 2 captions they use Stable Diffusion to generate 2 images. 
- Which gives them their artificially generated training sample made of pairs (instruction-[image from prompt 1, image from prompt 2])
- They then train Pix2Pix to generate image from prompt 2 given instruction and image from prompt 1

More at: https://www.timothybrooks.com/instruct-pix2pix


Venus de Milo             |  Turn her into a cyborg
:-------------------------:|:-------------------------:
![](https://github.com/eBoreal/serverless-pix2pix/blob/main/data/input/venus-of-milo-512.jpg)  |  ![](https://github.com/eBoreal/serverless-pix2pix/blob/main/data/output/venus-of-milo-512.jpeg) 

<br>

Elon            |  Turn him into a cyborg
:-------------------------:|:-------------------------:
![](https://github.com/eBoreal/serverless-pix2pix/blob/main/data/input/elon-512.jpg) |  ![](https://github.com/eBoreal/serverless-pix2pix/blob/main/data/output/elon-2-512.jpeg)

<br>


# Demo
![](https://github.com/eBoreal/ChatDiffusion/blob/main/.github/e-musk-cyborg-db.gif)

## Acknowledgment
This repo is forked from https://github.com/KAJdev/diffusion-chat and kept much of the front-end code. 

This repo uses the HuggingFace diffusers' implementation of Tim Brooks et al. Instruct Pix2pix model - https://www.timothybrooks.com/instruct-pix2pix

