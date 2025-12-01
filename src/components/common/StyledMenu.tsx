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
      {...p}
    />
  ))(({ theme }) => ({
    '& .MuiMenu-paper': {
      borderRadius: 8,
      minWidth: width,
      maxWidth: width,
      boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.4)',
      backgroundColor: theme.palette.grey.darker1,
    },
    '& .MuiMenu-list': {
      padding: 10,
    },
  }));

  return <TempMenu {...props} />;
}

const StyledMenuItem = styled((props: MenuItemProps) => (
  <MenuItem
    sx={{
      height: 'auto',
      backgroundColor: 'background.default',
      borderRadius: '3px',
      padding: '8px',
      ':hover': { backgroundColor: 'rgb(46, 45, 45)' },
    }}
    style={{ whiteSpace: 'normal' }}
    {...props}
  />
))(({ theme }) => ({
  '&.MuiMenuItem-root': {
    backgroundColor: theme.palette.grey.darker1,
    ':hover': {
      backgroundColor: theme.palette.grey.darker,
    },
  },
}));

export { StyledMenu, StyledMenuItem };
