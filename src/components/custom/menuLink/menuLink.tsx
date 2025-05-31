import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ISidebarLinkOptions {
  content?: string;
  to: string;
}

const MenuLink: FC<ISidebarLinkOptions> = ({ to, content }) => {
  return (
    <div>
      <Link className='link' to={to}>
        <span>{content}</span>
      </Link>
    </div>
  );
};

export default MenuLink;
