export interface Submenu {
  id: number | string;
  name: string;
  children?: Submenu[];
}

export interface MenuEntry {
  id: number | string;
  name: string;
  children?: Submenu[];
  data?:MenuEntry
}