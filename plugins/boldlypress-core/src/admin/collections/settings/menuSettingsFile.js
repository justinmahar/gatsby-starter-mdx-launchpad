const menuSettingsFile = {
  label: 'Menu Settings',
  name: 'menuSettings',
  file: 'settings/menu/menu-settings.yml',
  fields: [
    {
      label: 'Navbar Menu Top bar',
      name: 'navbarMenus',
      widget: 'list',
      fields: [
        {
          label: 'Menu Name (Not Shown)',
          name: 'name',
          widget: 'string',
          default: 'New Menu',
          hint:
            'The name of the menu. This is used for your reference only and does not actually appear in the navbar. Examples: Main Menu, Categories Submenu',
        },
        {
          label: 'Parent Menu Item Name',
          name: 'parentMenuItemName',
          widget: 'string',
          default: 'none',
          hint:
            'Set this to the name of any menu item and this entire menu will become a dropdown submenu of that menu item. Leave as none to make this the main menu. Examples: none, Categories',
        },
        {
          label: 'Menu Items',
          name: 'menuItems',
          widget: 'list',
          hint: 'The menu items for this menu.',
          fields: [
            {
              label: 'Menu Item Name',
              name: 'name',
              widget: 'string',
              default: 'New Menu Item',
              hint:
                'The name to appear in the menu. If this menu is a dropdown submenu menu, you can use three dashes --- to create a divider. Examples: About, Contact, ---, Categories',
            },
            {
              label: 'Link',
              name: 'link',
              widget: 'string',
              default: '#',
              hint: 'A relative or absolute link. Example: /terms',
            },
            {
              label: 'Class',
              name: 'class',
              widget: 'string',
              default: 'none',
              hint:
                'CSS class name(s) to use for the link. Set to "none" (no quotes) if not needed. Examples: none, font-weight-bold',
            },
            {
              label: 'External',
              name: 'external',
              widget: 'boolean',
              default: false,
              hint:
                'Switch this on if the link takes the visitor away from this site. Applies to mailto links as well.',
            },
            {
              label: 'Open In New Window',
              name: 'openInNewWindow',
              widget: 'boolean',
              default: false,
              hint: 'Switch this on to open the link in a new window.',
            },
          ],
        },
      ],
      hint:
        'This is the navbar menu at the top of the page. It collapses when on small screens, and supports dropdown submenus.',
    },
    {
      label: 'Footer Menus',
      name: 'footerMenus',
      widget: 'list',
      hint:
        "These menus appear in the footer and will be laid out on the page automatically. You can have as many as you'd like!",
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string',
          default: 'New Footer Menu',
          hint: 'The name of the menu that will be shown in the footer.',
        },
        {
          label: 'Menu Items',
          name: 'menuItems',
          widget: 'list',
          hint: 'The menu items for this menu.',
          fields: [
            {
              label: 'Name',
              name: 'name',
              widget: 'string',
              default: 'New Menu Item',
              hint: 'The name to appear in the copyright footer menu.',
            },
            {
              label: 'Link',
              name: 'link',
              widget: 'string',
              default: '#',
              hint: 'A relative or absolute link. Example: /terms',
            },
            {
              label: 'Class',
              name: 'class',
              widget: 'string',
              default: 'none',
              hint:
                'CSS class name(s) to use for the link. Set to "none" (no quotes) if not needed. Examples: none, font-weight-bold',
            },
            {
              label: 'External',
              name: 'external',
              widget: 'boolean',
              default: false,
              hint:
                'Switch this on if the link takes the visitor away from this site. Applies to mailto links as well.',
            },
            {
              label: 'Open In New Window',
              name: 'openInNewWindow',
              widget: 'boolean',
              default: false,
              hint: 'Switch this on to open the link in a new window.',
            },
          ],
        },
      ],
    },
    {
      label: 'Footer Legal Menu Items',
      name: 'footerLegalMenuItems',
      widget: 'list',
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string',
          default: 'New Menu Item',
          hint: 'The name to appear in the copyright footer menu.',
        },
        {
          label: 'Link',
          name: 'link',
          widget: 'string',
          default: '#',
          hint: 'A relative or absolute link. Example: /terms',
        },
        {
          label: 'Class',
          name: 'class',
          widget: 'string',
          default: 'none',
          hint:
            'CSS class name(s) to use for the link. Set to "none" (no quotes) if not needed. Examples: none, font-weight-bold',
        },
        {
          label: 'External',
          name: 'external',
          widget: 'boolean',
          default: false,
          hint: 'Switch this on if the link takes the visitor away from this site. Applies to mailto links as well.',
        },
        {
          label: 'Open In New Window',
          name: 'openInNewWindow',
          widget: 'boolean',
          default: false,
          hint: 'Switch this on to open the link in a new window.',
        },
      ],
      hint: 'The menu items appearing next to the copyright statement, such as links to terms and privacy pages.',
    },
  ],
};

export default menuSettingsFile;
