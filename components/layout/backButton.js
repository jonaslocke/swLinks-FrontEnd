import Link from "next/link";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  return (
    <Link href={`/${router.asPath.split("/")[1]}`}>
      <div className="backButton">
        <i className="fas fa-long-arrow-alt-left"></i>
        <a>voltar</a>
      </div>
    </Link>
  );
};

export default BackButton;
