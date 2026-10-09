def contains_span(haystack, needle):
    if not needle:
        return False
    n = len(needle)
    return any(haystack[k:k + n] == needle for k in range(len(haystack) - n + 1))
