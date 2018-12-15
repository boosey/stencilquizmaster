/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@stencil/router';
import '@stencil/state-tunnel';
import '@ionic/core';
import 'ionicons';


export namespace Components {

  interface AppAddGame {}
  interface AppAddGameAttributes extends StencilHTMLAttributes {
    'onAddGameRequested'?: (event: CustomEvent) => void;
  }

  interface AppCommands {}
  interface AppCommandsAttributes extends StencilHTMLAttributes {
    'onAddGameCompleted'?: (event: CustomEvent) => void;
    'onEditGameCompleted'?: (event: CustomEvent) => void;
  }

  interface AppEditGame {
    'gameId': string;
  }
  interface AppEditGameAttributes extends StencilHTMLAttributes {
    'gameId'?: string;
    'onLoadGameRequested'?: (event: CustomEvent) => void;
    'onUpdateGameRequested'?: (event: CustomEvent) => void;
  }

  interface AppGameDetails {
    'buttonText': string;
    'game': any;
    'titleText': string;
  }
  interface AppGameDetailsAttributes extends StencilHTMLAttributes {
    'buttonText'?: string;
    'game'?: any;
    'onGameDetailsSubmitted'?: (event: CustomEvent) => void;
    'titleText'?: string;
  }

  interface AppHome {}
  interface AppHomeAttributes extends StencilHTMLAttributes {
    'onUserUpdated'?: (event: CustomEvent) => void;
  }

  interface AppMainmenu {
    'close': () => void;
    'user': any;
  }
  interface AppMainmenuAttributes extends StencilHTMLAttributes {
    'onLoginRequested'?: (event: CustomEvent) => void;
    'onLogoutRequested'?: (event: CustomEvent) => void;
    'user'?: any;
  }

  interface AppPlayGame {}
  interface AppPlayGameAttributes extends StencilHTMLAttributes {
    'onPlayGameCompleted'?: (event: CustomEvent) => void;
    'onPlayGameRequested'?: (event: CustomEvent) => void;
  }

  interface AppProfile {
    'name': string;
  }
  interface AppProfileAttributes extends StencilHTMLAttributes {
    'name'?: string;
  }

  interface AppRoot {}
  interface AppRootAttributes extends StencilHTMLAttributes {}

  interface AppSubpageHeader {
    'titleText': string;
  }
  interface AppSubpageHeaderAttributes extends StencilHTMLAttributes {
    'titleText'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AppAddGame': Components.AppAddGame;
    'AppCommands': Components.AppCommands;
    'AppEditGame': Components.AppEditGame;
    'AppGameDetails': Components.AppGameDetails;
    'AppHome': Components.AppHome;
    'AppMainmenu': Components.AppMainmenu;
    'AppPlayGame': Components.AppPlayGame;
    'AppProfile': Components.AppProfile;
    'AppRoot': Components.AppRoot;
    'AppSubpageHeader': Components.AppSubpageHeader;
  }

  interface StencilIntrinsicElements {
    'app-add-game': Components.AppAddGameAttributes;
    'app-commands': Components.AppCommandsAttributes;
    'app-edit-game': Components.AppEditGameAttributes;
    'app-game-details': Components.AppGameDetailsAttributes;
    'app-home': Components.AppHomeAttributes;
    'app-mainmenu': Components.AppMainmenuAttributes;
    'app-play-game': Components.AppPlayGameAttributes;
    'app-profile': Components.AppProfileAttributes;
    'app-root': Components.AppRootAttributes;
    'app-subpage-header': Components.AppSubpageHeaderAttributes;
  }


  interface HTMLAppAddGameElement extends Components.AppAddGame, HTMLStencilElement {}
  var HTMLAppAddGameElement: {
    prototype: HTMLAppAddGameElement;
    new (): HTMLAppAddGameElement;
  };

  interface HTMLAppCommandsElement extends Components.AppCommands, HTMLStencilElement {}
  var HTMLAppCommandsElement: {
    prototype: HTMLAppCommandsElement;
    new (): HTMLAppCommandsElement;
  };

  interface HTMLAppEditGameElement extends Components.AppEditGame, HTMLStencilElement {}
  var HTMLAppEditGameElement: {
    prototype: HTMLAppEditGameElement;
    new (): HTMLAppEditGameElement;
  };

  interface HTMLAppGameDetailsElement extends Components.AppGameDetails, HTMLStencilElement {}
  var HTMLAppGameDetailsElement: {
    prototype: HTMLAppGameDetailsElement;
    new (): HTMLAppGameDetailsElement;
  };

  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppMainmenuElement extends Components.AppMainmenu, HTMLStencilElement {}
  var HTMLAppMainmenuElement: {
    prototype: HTMLAppMainmenuElement;
    new (): HTMLAppMainmenuElement;
  };

  interface HTMLAppPlayGameElement extends Components.AppPlayGame, HTMLStencilElement {}
  var HTMLAppPlayGameElement: {
    prototype: HTMLAppPlayGameElement;
    new (): HTMLAppPlayGameElement;
  };

  interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {}
  var HTMLAppProfileElement: {
    prototype: HTMLAppProfileElement;
    new (): HTMLAppProfileElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLAppSubpageHeaderElement extends Components.AppSubpageHeader, HTMLStencilElement {}
  var HTMLAppSubpageHeaderElement: {
    prototype: HTMLAppSubpageHeaderElement;
    new (): HTMLAppSubpageHeaderElement;
  };

  interface HTMLElementTagNameMap {
    'app-add-game': HTMLAppAddGameElement
    'app-commands': HTMLAppCommandsElement
    'app-edit-game': HTMLAppEditGameElement
    'app-game-details': HTMLAppGameDetailsElement
    'app-home': HTMLAppHomeElement
    'app-mainmenu': HTMLAppMainmenuElement
    'app-play-game': HTMLAppPlayGameElement
    'app-profile': HTMLAppProfileElement
    'app-root': HTMLAppRootElement
    'app-subpage-header': HTMLAppSubpageHeaderElement
  }

  interface ElementTagNameMap {
    'app-add-game': HTMLAppAddGameElement;
    'app-commands': HTMLAppCommandsElement;
    'app-edit-game': HTMLAppEditGameElement;
    'app-game-details': HTMLAppGameDetailsElement;
    'app-home': HTMLAppHomeElement;
    'app-mainmenu': HTMLAppMainmenuElement;
    'app-play-game': HTMLAppPlayGameElement;
    'app-profile': HTMLAppProfileElement;
    'app-root': HTMLAppRootElement;
    'app-subpage-header': HTMLAppSubpageHeaderElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
