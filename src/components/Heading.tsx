interface iHeadingWithDescription {
  title: string
  description: string
}
const HeadingWithDescription = ({ title, description }: iHeadingWithDescription) => {
  return <div className='text-center my-6'>
    <h1 className="mb-2 text-4xl font-bold tracking-tight">{title}</h1>
    <p className="text-lg font-normal text-body lg:text-xl sm:px-16 xl:px-48">{description}</p>
  </div>
}

export { HeadingWithDescription }