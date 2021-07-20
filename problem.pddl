(define (problem problem_name)
    (:domain domain_name)
    (:objects
        cell-n-n - cell
        cell-0-0 - cell
        cell-0-1 - cell
        cell-0-2 - cell
        cell-1-0 - cell
        cell-1-1 - cell
        cell-1-2 - cell
        cell-2-0 - cell
        cell-2-1 - cell
        cell-2-2 - cell
    )

    (:init
        (connected cell-0-0 cell-0-1)
        (connected cell-0-0 cell-1-0)
        (connected cell-1-1 cell-0-1)
        (connected cell-1-1 cell-1-0)
        (connected cell-0-2 cell-1-2)
        (connected cell-0-2 cell-0-1)
        (connected cell-1-1 cell-1-2)
        (connected cell-2-1 cell-2-2)
        (connected cell-2-1 cell-2-0)
        (connected cell-2-1 cell-1-1)
        (connected cell-2-0 cell-1-0)
        (connected cell-2-2 cell-1-2)
        (hero-pos cell-0-0)
        $
        ;todo: put the initial state's facts and numeric values here
    )

    (:goal
        (and
            (exists
                ( ?c - cell)
                (and (goal ?c) (hero-pos ?c) (princes-pos ?c))
            )
        )
    )
)