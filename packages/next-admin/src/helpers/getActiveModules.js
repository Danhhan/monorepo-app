import { ACCECPTED_MODULES } from 'configs/app.routes';

function getActiveModules(activeModules = ACCECPTED_MODULES) {
  return activeModules.join('|');
}

export default getActiveModules;
