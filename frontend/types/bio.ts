export interface SocialLinks {
    instagram?: string
    tiktok?: string
    linkedin?: string
    twitter?: string
  }
  
  export interface BioLink {
    id: string
    title: string
    description?: string
    url: string
    icon?: string
    price?: number
    rating?: number
    button_text?: string
  }
  
  export interface BioData {
    id: string
    name: string
    avatar: string
    socialLinks: SocialLinks
    links: BioLink[]
  }
  
  