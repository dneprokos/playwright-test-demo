import { Page } from "@playwright/test";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";
import { ResultFragment } from "./fragments-and-models/result.fragment";
import { SliderConfigurationFragment } from "./fragments-and-models/slider-configuration.fragment";

export default class TogglePage extends PageWithHeaderAndFooter {
    /**
     *
     */
    constructor(page: Page) {
        super(page);

        this.SliderConfiguration_Section = new SliderConfigurationFragment(page);
        this.Result_Section = new ResultFragment(page);
    }

    SliderConfiguration_Section: SliderConfigurationFragment;
    Result_Section: ResultFragment;
}