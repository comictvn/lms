import { Ability, AbilityBuilder } from '@casl/ability';
import { Role } from 'models/user';
import { PageObject } from 'utils/routers';
function subjectName(item: any) {
  if (!item || typeof item === 'string') {
    return item;
  }

  return item.__type;
}

const ability = new Ability([], { subjectName });

function defineRulesFor(auth: any) {
  const { can, rules } = AbilityBuilder.extract();
  if (auth.role === Role.Teacher) {
    can('view', PageObject.Assignment);
    can('view', PageObject.User);
  }

  return rules;
}

export { ability, defineRulesFor };
