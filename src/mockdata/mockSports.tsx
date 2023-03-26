import ISport from "@/interfaces/ISport";
import { v4 as uuidv4 } from 'uuid'

export const mockSports: ISport[] = [
    {
      _id: uuidv4(),
      name: 'Nascar',
      description: 'One of the all time classics. Predict outcomes in numerous categories within this sport and win big.',
      new: false,
      image_url: 'https://images.pexels.com/photos/40376/auto-racing-nascar-car-sport-40376.jpeg?auto=compress&cs=tinysrgb&w=900',
      challenges: 9
    },
    {
      _id: uuidv4(),
      name: 'Golf',
      description: 'One of the all time classics. Predict outcomes in numerous categories within this sport and win big.',
      new: false,
      challenges: 16,
      image_url: 'https://imgs.search.brave.com/XL3236i64r8594GIDmIBZBfOyJdlQ1wUF9zZrt7uZxQ/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC80LzYvZi83/OTIyMjMtY29vbC1n/b2xmLWJhY2tncm91/bmRzLTE5MjB4MTA4/MC1mb3ItYW5kcm9p/ZC10YWJsZXQuanBn'
    },
    {
      _id: uuidv4(),
      name: 'Basketball',
      description: 'One of the all time classics. Predict outcomes in numerous categories within this sport and win big.',
      new: false,
      challenges: 11,
      image_url: 'https://images.pexels.com/photos/2891884/pexels-photo-2891884.jpeg?auto=compress&cs=tinysrgb&w=950'
    },
    {
      _id: uuidv4(),
      name: 'Soccer',
      description: 'One of the all time classics. Predict outcomes in numerous categories within this sport and win big.',
      new: true,
      challenges: 22,
      image_url: 'https://images.pexels.com/photos/4056597/pexels-photo-4056597.png?auto=compress&cs=tinysrgb&w=900'
    },
    {
      _id: uuidv4(),
      name: 'Football',
      description: 'One of the all time classics. Predict outcomes in numerous categories within this sport and win big.',
      new: true,
      challenges: 12,
      image_url: 'https://images.pexels.com/photos/159571/american-football-football-canada-canadian-159571.jpeg?auto=compress&cs=tinysrgb&w=900'
    },
    {
      _id: uuidv4(),
      name: 'Baseball',
      description: 'One of the all time classics. Predict outcomes in numerous categories within this sport and win big.',
      new: true,
      challenges: 3,
      image_url: 'https://images.pexels.com/photos/139762/pexels-photo-139762.jpeg?auto=compress&cs=tinysrgb&w=900'
    },
  ]