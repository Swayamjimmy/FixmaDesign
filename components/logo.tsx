import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/" className="flex-1 flex items-center gap-2 text-lg md:text-2xl" >
      <h1 className="font-extrabold text-primary">Fixma -</h1>
      <p className="font-extrabold text-foreground">Design.ai</p>
    </Link>
  )
}

export default Logo