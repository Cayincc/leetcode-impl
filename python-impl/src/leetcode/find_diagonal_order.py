def find_diagonal_order(mat: list[list[int]]) -> list[int]:
    m = len(mat)
    n = len(mat[0])

    result, intermediate = [], []
    for d in range(m + n - 1):
        if d < n:
            r = 0
            c = d
        else:
            r = d - n + 1
            c = n - 1
        intermediate.clear()
        while r < m and c > -1:
            intermediate.append(mat[r][c])
            r += 1
            c -= 1
        if len(intermediate) > 1 and d % 2 == 0:
            intermediate.reverse()
        result.extend(intermediate)
    return result