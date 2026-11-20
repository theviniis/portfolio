import image from '@/assets/profile-480.webp'
import imageSmall from '@/assets/profile-240.webp'
import imageMedium from '@/assets/profile-320.webp'

export const profile = {
  name: 'Vinícius Costa',
  firstName: 'Vinícius',
  image,
  imageSrcSet: `${imageSmall} 240w, ${imageMedium} 320w, ${image} 480w`,
  email: 'vinicius.dsc95@gmail.com',
  linkedin: 'https://www.linkedin.com/in/viniis/',
  github: 'https://github.com/theviniis/',
  whatsapp: 'https://wa.me/5511987372296'
} as const
