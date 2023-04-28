import { renderHook, act } from "@testing-library/react-hooks";
import useInputUpdater from "./useInputUpdater";

describe("useInputUpdater", () => {
  const trimmer = (value) => value.trim();
  const validator = (value) => {
    const result = /^\d{3}$/.test(value);
    const errorMessage = result ? "" : "숫자 자리수가 3자리가 아닙니다.";
    return { result, errorMessage };
  };
  const contextSetter = jest.fn();

  it("should set input value with validation for 3 digits number", () => {
    const { result } = renderHook(() =>
      useInputUpdater({ trimmer, validator, contextSetter })
    );

    act(() => {
      result.current.setInputValueWithValidation("123");
    });

    expect(result.current.inputValue).toBe("123");
    expect(result.current.errorMessage).toBe("");
    expect(contextSetter).toHaveBeenCalledWith({ value: "123", isValid: true });
  });

  it("should set error message for non 3 digits number", () => {
    const { result } = renderHook(() =>
      useInputUpdater({ trimmer, validator, contextSetter })
    );

    act(() => {
      result.current.setInputValueWithValidation("12");
    });

    expect(result.current.inputValue).toBe("12");
    expect(result.current.errorMessage).toBe("숫자 자리수가 3자리가 아닙니다.");
    expect(contextSetter).toHaveBeenCalledWith({
      value: "12",
      isValid: false,
    });
  });
});
