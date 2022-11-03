import React from "react";
import { render } from "@testing-library/react";

import Icon, { IconSet } from "../components/Icon";

describe("Icon A", () => {
    test("renders the IconSet", () => {
        render(
            <div>
                {Object.keys(IconSet).map(key => (
                    <Icon icon={IconSet[key]} />
                ))}
            </div>
        );
    });
});
