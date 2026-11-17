import { Locator } from "@playwright/test";
import { step } from "@framework/decorators/step-decorator";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";
import { CheckBoxNames } from "./checkbox-names-enum";

export type TaskListStatus = {
    allComplete: boolean;
    someComplete: boolean;
};

export default class CheckBoxesPage extends PageWithHeaderAndFooter {
    // "Task List" card: a parent checkbox ("Indeterminate") controlling Primary / Accent / Warn.
    private readonly taskList: Locator = this.page.locator('mat-card', { hasText: 'Task List' });

    private static readonly labels: Record<CheckBoxNames, string> = {
        [CheckBoxNames.indeterminate]: 'Indeterminate',
        [CheckBoxNames.primary]: 'Primary',
        [CheckBoxNames.accent]: 'Accent',
        [CheckBoxNames.warn]: 'Warn',
    };

    protected override readyLocators(): Locator[] {
        return [this.checkbox(CheckBoxNames.indeterminate)];
    }

    @step('Click {0} checkbox')
    async clickOnCheckBox(name: CheckBoxNames): Promise<void> {
        await this.checkbox(name).click();
    }

    async isChecked(name: CheckBoxNames): Promise<boolean> {
        return await this.checkbox(name).isChecked();
    }

    /** Reads the "All complete: … / Some complete: …" summary under the task list. */
    async getTaskListStatus(): Promise<TaskListStatus> {
        const text = await this.taskList.innerText();
        return {
            allComplete: /All complete:\s*true/.test(text),
            someComplete: /Some complete:\s*true/.test(text),
        };
    }

    private checkbox(name: CheckBoxNames): Locator {
        return this.taskList.getByRole('checkbox', { name: CheckBoxesPage.labels[name], exact: true });
    }
}
