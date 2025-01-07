import { useEffect, useState } from "react";

import { ClientSetting } from "@/types";

import useSettingStore from "@/hooks/use-setting-store";

export const AppInitializer = ({
  setting,
  children,
}: {
  setting: ClientSetting;
  children: React.ReactNode;
}) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, [setting]);
  if (!rendered) {
    useSettingStore.setState({
      setting,
    });
  }

  return children;
};
