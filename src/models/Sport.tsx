import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const SportSchema = new mongoose.Schema({
  name: {
    /* The name of this sport */

    type: String,
    required: [true, 'Please provide a name for this sport.'],
  },
  description: {
    /* The sport description to be shown when browsing available sports */

    type: String,
    required: [true, 'Please specify the name of the sport.'],
  },
  new: {
    /* Boolean that indicates if the sport is a new addition to the platform */

    type: Boolean,
  },
  image_url: {
    /* Url to sport image */

    required: [true, 'Please provide an image url for this sport.'],
    type: String,
  },
  challenges: {
    /* Url to sport image */
    default: 0,
    type: Number,
  },
})

export default mongoose.models.Sport || mongoose.model('Sport', SportSchema)