import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';

function Icon(props: { type: string }) {
  switch (props.type) {
    case 'github':
      return <GitHubIcon />;
    default:
      return <HomeIcon />;
  }
}

export default Icon;
