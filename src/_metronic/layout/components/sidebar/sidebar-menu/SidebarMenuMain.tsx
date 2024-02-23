import { useIntl } from 'react-intl';
import { KTIcon } from '../../../../helpers';
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub';
import { SidebarMenuItem } from './SidebarMenuItem';

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem to="/dashboard" icon="home" title="Home" fontIcon="bi-app-indicator" />
      {/*<SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' />*/}
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Folders and Reports
          </span>
        </div>
      </div>
      {/*<SidebarMenuItemWithSub
        to="/crafted/pages"
        title="Pages"
        fontIcon="bi-archive"
        icon="element-plus"
      >
        <SidebarMenuItemWithSub to="/crafted/pages/profile" title="Profile" hasBullet={true}>
          <SidebarMenuItem to="/crafted/pages/profile/overview" title="Overview" hasBullet={true} />
          <SidebarMenuItem to="/crafted/pages/profile/projects" title="Projects" hasBullet={true} />
          <SidebarMenuItem
            to="/crafted/pages/profile/campaigns"
            title="Campaigns"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/documents"
            title="Documents"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/connections"
            title="Connections"
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub to="/crafted/pages/wizards" title="Wizards" hasBullet={true}>
          <SidebarMenuItem
            to="/crafted/pages/wizards/horizontal"
            title="Horizontal"
            hasBullet={true}
          />
          <SidebarMenuItem to="/crafted/pages/wizards/vertical" title="Vertical" hasBullet={true} />
        </SidebarMenuItemWithSub>
  </SidebarMenuItemWithSub>*/}
      {/*<SidebarMenuItemWithSub
        to="/crafted/accounts"
        title="Accounts"
        icon="profile-circle"
        fontIcon="bi-person"
>
        <SidebarMenuItem to="/crafted/account/overview" title="Overview" hasBullet={true} />
        <SidebarMenuItem to="/crafted/account/settings" title="Settings" hasBullet={true} />
      </SidebarMenuItemWithSub>*/}
      <SidebarMenuItemWithSub to="/error" title="Folders" fontIcon="bi-sticky" icon="folder">
        <SidebarMenuItem to="/error/404" title="Folder 1" hasBullet={true} />
        <SidebarMenuItem to="/error/404" title="Folder 2" hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to="/crafted/widgets"
        title="Reports"
        icon="element-7"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem to="/error/404" title="Report 1" hasBullet={true} />
        <SidebarMenuItem to="/error/404" title="Report 2" hasBullet={true} />
        <SidebarMenuItem to="/error/404" title="Report 3" hasBullet={true} />
        <SidebarMenuItem to="/error/404" title="Report 4" hasBullet={true} />
        <SidebarMenuItem to="/error/404" title="Report 5" hasBullet={true} />
        <SidebarMenuItem to="/error/404" title="Report 6" hasBullet={true} />
        {/*
        <SidebarMenuItem to="/crafted/widgets/lists" title="Lists" hasBullet={true} />
        <SidebarMenuItem to="/crafted/widgets/statistics" title="Statistics" hasBullet={true} />
        <SidebarMenuItem to="/crafted/widgets/charts" title="Charts" hasBullet={true} />
        <SidebarMenuItem to="/crafted/widgets/mixed" title="Mixed" hasBullet={true} />
        <SidebarMenuItem to="/crafted/widgets/tables" title="Tables" hasBullet={true} />
        <SidebarMenuItem to="/crafted/widgets/feeds" title="Feeds" hasBullet={true} />*/}
      </SidebarMenuItemWithSub>
      {/*<div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">Apps</span>
        </div>
      </div>*/}
      {/*<SidebarMenuItemWithSub
        to="/apps/chat"
        title="Chat"
        fontIcon="bi-chat-left"
        icon="message-text-2"
      >
        <SidebarMenuItem to="/apps/chat/private-chat" title="Private Chat" hasBullet={true} />
        <SidebarMenuItem to="/apps/chat/group-chat" title="Group Chart" hasBullet={true} />
        <SidebarMenuItem to="/apps/chat/drawer-chat" title="Drawer Chart" hasBullet={true} />
    </SidebarMenuItemWithSub>*/}
      {/*<SidebarMenuItem
        to="/apps/user-management/users"
        icon="abstract-28"
        title="User management"
        fontIcon="bi-layers"
  />*/}
      {/*<div className="menu-item">
        <a
          target="_blank"
          className="menu-link"
          href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL + '/changelog'}
        >
          <span className="menu-icon">
            <KTIcon iconName="code" className="fs-2" />
          </span>
          <span className="menu-title">Changelog {import.meta.env.VITE_APP_VERSION}</span>
        </a>
</div>*/}
    </>
  );
};

export { SidebarMenuMain };
