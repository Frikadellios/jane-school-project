import { Clock, Code, Command, Feather, Palette, Sparkles } from 'lucide-react'

interface Feature {
  id: number
  name: string
  description: string
  icon: JSX.Element
}

const iconSize = 18

const FeaturesData: Feature[] = [
  {
    id: 1,
    name: 'Easy to Use',
    description: 'SyntaxUI components are designed to be intuitive and easy to use, even for beginners.',
    icon: <Sparkles size={iconSize} />
  },
  {
    id: 2,
    name: 'Customizable',
    description: 'Customize the look and feel of SyntaxUI components to match your brand and design.',
    icon: <Palette size={iconSize} />
  },
  {
    id: 3,
    name: 'Developer-Friendly',
    description: 'SyntaxUI is built with developers in mind, providing a clean and consistent API.',
    icon: <Code size={iconSize} />
  },
  {
    id: 4,
    name: 'Responsive',
    description: 'SyntaxUI components are designed to be responsive and work seamlessly across devices.',
    icon: <Feather size={iconSize} />
  },
  {
    id: 5,
    name: 'Accessible',
    description: 'SyntaxUI prioritizes accessibility, ensuring that your components are usable by everyone.',
    icon: <Command size={iconSize} />
  },
  {
    id: 6,
    name: 'Regularly Updated',
    description: 'SyntaxUI is actively maintained and regularly updated with new features and improvements.',
    icon: <Clock size={iconSize} />
  }
]

const FeaturesGrid = () => {
  return (
    <div>
      <div className="mt-8 my-10 grid w-full grid-cols-2 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {FeaturesData.map((feature) => {
          return (
            <div key={feature.id} className="width-fit text-left">
              <div className="mb-2 w-fit rounded-lg bg-primary p-1 text-center text-neon-pink ">{feature.icon}</div>
              <div className="scroll-m-20 my-auto text-lg mb-1 font-semibold text-neon-pink tracking-tight">
                {feature.name}
              </div>
              <div className="max-w-sm text-md leading-6 text-muted-foreground">{feature.description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const FeaturesWithHeading = () => {
  return (
    <div className="my-12 flex w-full flex-col items-center justify-center">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0 tracking-tighter text-neon-pink md:text-3xl">
        Jane School is not like any other online learning system or school library.
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center my-3 text-foreground">
        My brain is a free to use, customizable, and highly customizable for any client or partner.
      </p>
      <FeaturesGrid />
    </div>
  )
}

export default FeaturesWithHeading
