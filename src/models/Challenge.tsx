import mongoose from 'mongoose'

/* ChallengeSchema will correspond to a collection in your MongoDB database. */
const ChallengeSchema = new mongoose.Schema({
  title: {
    /* The title for this challenge */

    type: String,
    required: [true, 'Please provide a name for this sport.'],
  },
  description: {
    /* The challenge description to be shown when browsing challenges */

    type: String,
    required: [true, 'Please specify the challenge description.'],
  },
  sport_name: {
    /* the corresponding sport name which this challenge is based on */

    type: String,
  },
  participants: {
    /* the number of participants currently participating in this challenge */

    default: 0,
    type: Number,
  },
  prize_pool: {
    /* Prize Pool for this challenge, in US$ */
    required: [true, 'Please specify the prize pool for the challenge'],
    type: Number,
  },
  end_date: {
    /* UTC String Date of the date the challenge will end */
    required: [true, 'Please specify when the challenge will end in UTC String format'],
    type: String,
  },
  rules_description: {
    /* the rules description for this challenge */
    type: String
  },
  max_participants: {
    /* the max number of participants allowed in this challenge*/
    type: Number
  }
  
})

export default mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema)