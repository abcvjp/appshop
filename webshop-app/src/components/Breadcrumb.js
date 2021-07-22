import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

function handleClick(event) {
  event.preventDefault();
}

export default function BreadcrumbsMe({ breadcrumbs = [] }) {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      {breadcrumbs.map((breadcrumb, index) =>
        index === breadcrumbs.length - 1 ? <Link
          color="inherit"
          href={breadcrumb.path}
          onClick={handleClick}
          className={classes.link}
        >
          {breadcrumb.name}
        </Link> : <Typography color="textPrimary" className={classes.link}>
          <GrainIcon className={classes.icon} />
          {breadcrumb.name}
        </Typography>
      )}
    </Breadcrumbs>
  );
}