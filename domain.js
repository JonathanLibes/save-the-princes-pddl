export const domain = `;Header and description

(define (domain domain_name)

    ;remove requirements that are not needed
    (:requirements :strips :fluents :typing :conditional-effects :negative-preconditions :equality :disjunctive-preconditions)

    (:types ;todo: enumerate types and their hierarchy here, e.g. car truck bus - vehicle
        cell player princess-status key-status
    )

    ; un-comment following line if constants are needed
    ;(:constants )
    (:constants
        cell-1-1 - cell
        cell-2-1 - cell
    )

    (:predicates ;todo: define predicates here
        (connected ?from - cell ?to - cell)
        (hero-pos ?position - cell)
        (princes-pos ?position - cell)
        (stone-pos ?position - cell)
        (key-pos ?position - cell)
        (goal ?position - cell)
        (dragon-pos ?position - cell)
        (dragon-mov ?heroPosition - cell ?from - cell ?to - cell)

    )
    (:functions ;todo: define numeric functions here

    )

    (:action walk
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (not (stone-pos ?to))
            (hero-pos ?from)
            (not (princes-pos ?to))
            (not (key-pos ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (when
                (and (dragon-pos cell-1-1))
                (and (dragon-pos cell-2-1) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos cell-2-1))
                (and (dragon-pos cell-1-1) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-with-princes
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (not (stone-pos ?to))
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
                (and (dragon-pos cell-1-1))
                (and (dragon-pos cell-2-1) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos cell-2-1))
                (and (dragon-pos cell-1-1) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-with-key
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (not (stone-pos ?to))
            (hero-pos ?from)
            (key-pos ?from)
            (not (princes-pos ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (key-pos ?from))
            (key-pos ?to)
            (when
                (and (dragon-pos cell-1-1))
                (and (dragon-pos cell-2-1) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos cell-2-1))
                (and (dragon-pos cell-1-1) (not(dragon-pos ?dragon)))
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
                (and (dragon-pos cell-1-1))
                (and (dragon-pos cell-2-1) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos cell-2-1))
                (and (dragon-pos cell-1-1) (not(dragon-pos ?dragon)))
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
            (key-pos ?to)
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (when
                (and (dragon-pos cell-1-1))
                (and (dragon-pos cell-2-1) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos cell-2-1))
                (and (dragon-pos cell-1-1) (not(dragon-pos ?dragon)))
            )
        )
    )
    ;define actions here

)`;