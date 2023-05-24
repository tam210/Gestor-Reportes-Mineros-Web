import Link from "next/link"

function navigation() {
  return (
    <ul>
        <li>
        <Link href="/">Home</Link>
        </li>
        <li>
        <Link href="/menu">Menu</Link>
        </li>
        <li>
        <Link href="/login">Login</Link>
        </li>
        <li>
        <Link href="/register">Register</Link>
        </li>
    </ul>
  )
}

export default navigation