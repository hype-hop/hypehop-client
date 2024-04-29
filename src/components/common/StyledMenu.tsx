import { Menu, MenuItem, MenuProps, MenuItemProps, styled } from '@mui/material';

function StyledMenu({ width, ...props }: { width: number } & MenuProps) {
  const TempMenu = styled((p: MenuProps) => (
    <Menu
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...p}
    />
  ))(({ theme }) => ({
    '& .MuiMenu-paper': {
      borderRadius: 16,
      minWidth: width,
      maxWidth: width,
      boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.4)',
      backgroundColor: theme.palette.background.default,
      outline: '1px solid rgb(47, 47, 47)',
    },
    '& .MuiMenu-list': {
      padding: 8,
    },
  }));

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TempMenu {...props} />;
}

const StyledMenuItem = styled((props: MenuItemProps) => (
  <MenuItem
    sx={{
      height: 'auto',
      backgroundColor: 'background.default',
      borderRadius: '8px',
      ':hover': { backgroundColor: 'rgb(46, 45, 45)' },
    }}
    style={{ whiteSpace: 'normal' }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
))();

export { StyledMenu, StyledMenuItem };
