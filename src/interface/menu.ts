export interface Submenu {
  key: number | string;
  label: string;
  children?: Submenu[];
}

export interface MenuEntry {
  key: number | string;
  label: string;
  children?: Submenu[];
  data?:MenuEntry
}