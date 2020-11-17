import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Config } from '@other/interfaces';
import { report } from 'process';

export namespace ConfigActions {

  export class Set {
    static readonly type = '[Config] Set';
    constructor(
        public readonly config: Config
    ) { }
  }

  export class SetParameter {
    static readonly type = '[Config] Set parameter';
    constructor(
        public readonly prop: string,
        public readonly value: any
    ) { }
  }

}

/**
 * Config State
 */
@State<Partial<Config>>({
  name: 'config',
  defaults: {}
})
@Injectable()
export class ConfigState {

  @Action(ConfigActions.Set)
  set({ setState }: StateContext<Partial<Config>>, { config }: ConfigActions.Set) {
    setState(config);
  }

  @Action(ConfigActions.Set)
  setParam({ patchState }: StateContext<Partial<Config>>, { prop, value }: ConfigActions.SetParameter) {
    patchState({ [prop]: value });
  }

  @Selector()
  static GetLanguageHuman(ctx: Partial<Config>) {
    return ctx.language === 'en' ? 'English' : 'Deutsch';
  }

  @Selector()
  static GetLanguage(ctx: Partial<Config>) {
    return ctx.language;
  }

  @Selector()
  static GetReportInfo(ctx: Partial<Config>) {
    return (reportKey: string) => {
      return ctx.reports[ctx.target][ctx.scenario][reportKey];
    };
  }

}
