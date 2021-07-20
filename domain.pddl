
(define (domain domain_name)

    ;remove requirements that are not needed
    (:requirements :strips :fluents :typing :conditional-effects :negative-preconditions :equality :disjunctive-preconditions)

    (:types ;todo: enumerate types and their hierarchy here, e.g. car truck bus - vehicle
        cell player princess-status key-status
    )

    ; un-comment following line if constants are needed
    ;(:constants )
    (:constants
        cell-n-n - cell
        dragonStart - cell
        dragonEnd - cell
    )

    (:predicates ;todo: define predicates here
        (connected ?from - cell ?to - cell)
        (hero-pos ?position - cell)
        (princes-pos ?position - cell)
        (block-pos ?position - cell)
        (key-pos ?position - cell)
        (goal ?position - cell)
        (dragon-pos ?position - cell)
        (sword-pos ?position - cell)
    )
    (:functions ;todo: define numeric functions here

    )

    (:action walk
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (not (block-pos ?to))
            (hero-pos ?from)
            (not (princes-pos ?to))
            (not (key-pos ?to))
            (not (goal ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-with-princes
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (not (block-pos ?to))
            (hero-pos ?from)
            (princes-pos ?from)
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (princes-pos ?from))
            (princes-pos ?to)
            (not (key-pos ?from))
            (key-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-with-key
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (not (block-pos ?to))
            (hero-pos ?from)
            (key-pos ?from)
            (not (goal ?to))
            ;(not (princes-pos ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (key-pos ?from))
            (key-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-to-unlock-princes
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (hero-pos ?from)
            (key-pos ?from)
            (princes-pos ?to)
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (key-pos ?from))
            (key-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-to-pick-key
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (hero-pos ?from)
            (key-pos ?to)
            (not (goal ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-to-pick-sword
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (hero-pos ?from)
            (sword-pos ?to)
            (not (goal ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-with-sword
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (hero-pos ?from)
            (sword-pos ?from)
            ; (not (goal ?to))
            (not (princes-pos ?to))
            (not (key-pos ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (sword-pos ?from))
            (sword-pos ?to)
        )
    )
    (:action walk-to-kill-dragon
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (dragon-pos ?to)
            (hero-pos ?from)
            (sword-pos ?from)
            (not (princes-pos ?to))
            (not (key-pos ?to))
            (not (goal ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (sword-pos ?from))
            (sword-pos ?to)
            (not (dragon-pos ?to))
            (dragon-pos cell-n-n)
        )
    )
)