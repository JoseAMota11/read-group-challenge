import Link from 'next/link';

function Footer() {
  return (
    <footer>
      <h3 className="text-center">
        Hecho por{' '}
        <Link href="https://github.com/JoseAMota11" className="text-blue-500">
          José Mota ♥️
        </Link>
      </h3>
    </footer>
  );
}

export default Footer;
