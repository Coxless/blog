//! ブログのラボで使う WASM デモ。ビルドは `pnpm wasm:build`。

/// JavaScript 側との比較のため、あえて再帰で計算する。
#[unsafe(no_mangle)]
pub extern "C" fn fib(n: u32) -> u64 {
    if n < 2 {
        u64::from(n)
    } else {
        fib(n - 1) + fib(n - 2)
    }
}

#[cfg(test)]
mod tests {
    use super::fib;

    #[test]
    fn computes_fibonacci_numbers() {
        assert_eq!(fib(0), 0);
        assert_eq!(fib(1), 1);
        assert_eq!(fib(10), 55);
    }
}
