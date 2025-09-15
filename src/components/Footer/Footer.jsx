import { GithubOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://github.com/Makovniuk"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <GithubOutlined style={{ fontSize: "24px" }} />
      </a>
      <span> © 2025 Made by Makovniuk</span>
    </footer>
  );
};

export default Footer;
