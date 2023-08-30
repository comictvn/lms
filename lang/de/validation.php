<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => ':attribute muss akzeptiert werden.',
    'active_url' => ':attribute ist keine gültige URL.',
    'after' => '',
    'after_or_equal' => 'Das :attribute muss ein Datum nach oder gleich :date sein.',
    'alpha' => ':attribute darf nur Buchstaben enthalten.',
    'alpha_dash' => ':attribute darf nur Buchstaben, Nummern und Bindestriche enthalten.',
    'alpha_num' => ':attribute darf nur Buchstaben und Nummern enthalten.',
    'array' => ':attribute muss ein Array sein.',
    'before' => '',
    'before_or_equal' => 'Das :attribute muss ein Datum vor oder gleich dem :date sein.',
    'between' => [
        'numeric' => ':attribute muss zwischen :min und :max sein.',
        'file' => ':attribute muss zwischen :min und :max Kilobytes gross sein.',
        'string' => ':attribute muss zwischen :min und :max Zeichen lang sein.',
        'array' => ':attribute muss zwischen :min und :max Einträge enthalten.',
    ],
    'boolean' => ':attribute darf nur Wahr oder Falsch sein.',
    'confirmed' => ':attribute Wiederholung stimmt nicht überein.',
    'date' => '',
    'date_equals' => 'The :attribute must be a date equal to :date.',
    'date_format' => '',
    'different' => ':attribute und :other müssen unterschiedlich sein.',
    'digits' => ':attribute muss :digits Ziffern enthalten.',
    'digits_between' => ':attribute muss zwischen :min und :max Ziffern enthalten.',
    'dimensions' => 'Das :attribute hat ungültige Bildabmessungen.',
    'distinct' => 'Das :attribute Feld hat einen Wert, der bereits verwendet wurde.',
    'email' => ':attribute muss eine gültige E-Mailadresse sein.',
    'ends_with' => 'The :attribute must end with one of the following: :values',
    'exists' => ':attribute ist ungültig.',
    'file' => 'Das :attribute muss eine Datei sein.',
    'filled' => ':attribute ist erforderlich.',
    'gt' => [
        'numeric' => 'The :attribute must be greater than :value.',
        'file' => 'The :attribute must be greater than :value kilobytes.',
        'string' => '',
        'array' => 'The :attribute must have more than :value items.',
    ],
    'gte' => [
        'numeric' => 'The :attribute must be greater than or equal :value.',
        'file' => 'The :attribute must be greater than or equal :value kilobytes.',
        'string' => '',
        'array' => 'The :attribute must have :value items or more.',
    ],
    'image' => ':attribute muss ein Bild sein.',
    'in' => ':attribute ist ungültig.',
    'in_array' => '',
    'integer' => '',
    'ip' => ':attribute muss eine gültige IP-Adresse sein.',
    'ipv4' => 'The :attribute must be a valid IPv4 address.',
    'ipv6' => 'The :attribute must be a valid IPv6 address.',
    'json' => ':attribute muss eine gültige JSON-Zeichenkette sein.',
    'lt' => [
        'numeric' => 'The :attribute must be less than :value.',
        'file' => 'The :attribute must be less than :value kilobytes.',
        'string' => '',
        'array' => 'The :attribute must have less than :value items.',
    ],
    'lte' => [
        'numeric' => 'The :attribute must be less than or equal :value.',
        'file' => 'The :attribute must be less than or equal :value kilobytes.',
        'string' => '',
        'array' => 'The :attribute must not have more than :value items.',
    ],
    'max' => [
        'numeric' => ':attribute darf nicht grösser sein als :max.',
        'file' => ':attribute darf nicht grösser sein als :max Kilobytes.',
        'string' => '',
        'array' => ':attribute darf nicht mehr Einträge enthalten als :max Einträge.',
    ],
    'mimes' => '',
    'mimetypes' => '',
    'min' => [
        'numeric' => ':attribute muss mindestens :min sein.',
        'file' => ':attribute muss mindestens :min Kilobytes gross sein.',
        'string' => '',
        'array' => ':attribute muss mindestens :min Einträge enthalten.',
    ],
    'not_in' => '',
    'not_regex' => '',
    'numeric' => '',
    'present' => 'Das :attribute-Feld muss vorhanden sein.',
    'regex' => '',
    'required' => '',
    'required_if' => ':attribute ist erforderlich, wenn :other folgenden Wert hat: :value.',
    'required_unless' => ':attribute ist erforderlich, ausser :other enthält :values.',
    'required_with' => ':attribute ist erforderlich, wenn :values vorhanden ist.',
    'required_with_all' => ':attribute ist erforderlich, wenn :values vorhanden ist.',
    'required_without' => ':attribute ist erforderlich, wenn :values nicht vorhanden ist.',
    'required_without_all' => ':attribute ist erforderlich, wenn keine von :values vorhanden ist.',
    'same' => ':attribute und :other müssen gleich sein.',
    'size' => [
        'numeric' => ':attribute muss :size gross ein.',
        'file' => '',
        'string' => ':attribute muss :size Zeichen enthalten.',
        'array' => ':attribute muss :size Einträge enthalten.',
    ],
    'starts_with' => 'The :attribute must start with one of the following: :values',
    'string' => '',
    'timezone' => ':attribute muss eine gültige Zeitzone sein.',
    'unique' => '',
    'uploaded' => ':attribute wurde nicht hochgeladen.',
    'url' => ':attribute Format ist ungültig.',
    'uuid' => 'The :attribute must be a valid UUID.',
    'recaptcha_v3' => [
        'missing-input-response' => '',
        'timeout-or-duplicate' => '',
        'connection-failed' => '',
        'unknown-error' => '',
        'score-threshold-not-met' => '',
        'challenge-timeout' => '',
        'hostname-mismatch' => '',
        'bad-response' => '',
        'invalid-json' => '',
        'invalid-input-secret' => '',
    ],
    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'Individuelle-Nachricht',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [],
];
