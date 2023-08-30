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

    'accepted' => ':attributeを承認してください。',
    'accepted_if' => ':otherが:valueの場合、:attributeを承認する必要があります。',
    'active_url' => ':attributeには有効なURLを指定してください。',
    'after' => '',
    'after_or_equal' => ':attributeには:dateかそれ以降の日付を指定してください。',
    'alpha' => ':attributeには英字のみからなる文字列を指定してください。',
    'alpha_dash' => ':attributeには英数字・ハイフン・アンダースコアのみからなる文字列を指定してください。',
    'alpha_num' => ':attributeには英数字のみからなる文字列を指定してください。',
    'array' => ':attributeには配列を指定してください。',
    'ascii' => ':attributeには、英数字と記号のみ使用可能です。',
    'before' => '',
    'before_or_equal' => ':attributeには:dateかそれ以前の日付を指定してください。',
    'between' => [
        'numeric' => ':attributeには:min〜:maxまでの数値を指定してください。',
        'file' => ':attributeには:min〜:max KBのファイルを指定してください。',
        'string' => ':attributeには:min〜:max文字の文字列を指定してください。',
        'array' => ':attributeには:min〜:max個の要素を持つ配列を指定してください。',
    ],
    'boolean' => ':attributeには真偽値を指定してください。',
    'confirmed' => ':attributeが確認用の値と一致しません。',
    'current_password' => 'パスワードが正しくありません。',
    'date' => '',
    'date_equals' => ':attributeは:dateと同じ日付でなければなりません。',
    'date_format' => '',
    'decimal' => ':attributeは、小数点以下が:decimalでなければなりません。',
    'declined' => ':attributeを拒否する必要があります。',
    'declined_if' => ':otherが:valueの場合、:attributeを拒否する必要があります。',
    'different' => ':attributeには:otherとは異なる値を指定してください。',
    'digits' => ':attributeは:digits桁の数字でなければなりません。',
    'digits_between' => ':attributeは:min〜:max桁の数字である必要があります。',
    'dimensions' => ':attributeの画像サイズが無効です。',
    'distinct' => ':attributeに指定された値は重複しています。',
    'doesnt_end_with' => ':attributeは次のいずれかで終わってはいけません。: :values',
    'doesnt_start_with' => ':attributeは次のうちいずれかで始まってはいけません。: :values',
    'email' => ':attributeは有効なメールアドレスでなければなりません。',
    'ends_with' => ':attributeは、:valuesのいずれかで終了する必要があります。',
    'enum' => '選択した :attributeは 無効です。',
    'exists' => '選択された:attributeは無効です。',
    'file' => ':attributeはファイルでなければなりません。',
    'filled' => ':attributeには値が必要です。',
    'gt' => [
        'numeric' => ':attributeは:valueより大きくなければなりません。',
        'file' => ':attributeは:valueキロバイトより大きくなければなりません。',
        'string' => '',
        'array' => ':attributeには:valueより多くのアイテムが必要です。',
    ],
    'gte' => [
        'numeric' => ':attributeは:value以上でなければなりません。',
        'file' => ':attributeは:valueキロバイト以上でなければなりません。',
        'string' => '',
        'array' => ':attributeには:value以上のアイテムが必要です。',
    ],
    'image' => ':attributeは画像でなければなりません。',
    'in' => '選択された:attributeは、有効ではありません。',
    'in_array' => '',
    'integer' => '',
    'ip' => ':attributeは有効なIPアドレスでなければなりません。',
    'ipv4' => ':attributeは有効なIPv4アドレスでなければなりません。',
    'ipv6' => ':attributeは有効なIPv6アドレスでなければなりません。',
    'json' => ':attributeは有効なJSON文字列でなければなりません。',
    'lowercase' => ':attributeは、小文字で入力してください。',
    'lt' => [
        'numeric' => ':attributeは:valueより小さくなければなりません。',
        'file' => ':attributeは:valueキロバイトより小さくなければなりません。',
        'string' => '',
        'array' => ':attributeには:valueより少ないアイテムが必要です。',
    ],
    'lte' => [
        'numeric' => ':attributeは:value以下でなければなりません。',
        'file' => ':attributeは:valueキロバイト以下でなければなりません。',
        'string' => '',
        'array' => ':attributeには:value以下のアイテムが必要です。',
    ],
    'mac_address' => ':attributeは、:value文字以下でなければいけません。',
    'max' => [
        'numeric' => ':attributeは:maxより大きくてはいけません。',
        'file' => ':attributeは:maxキロバイトを超えてはいけません。',
        'string' => '',
        'array' => ':attributeには:max個を超えるアイテムを含めることはできません。',
    ],
    'max_digits' => ':attributeは、:max桁以下の数字でなければいけません。',
    'mimes' => '',
    'mimetypes' => '',
    'min' => [
        'numeric' => ':attributeは:maxより小さくてはいけません。',
        'file' => ':attributeは:maxキロバイトより小さくてはいけません。',
        'string' => '',
        'array' => ':attributeには少なくとも:min個のアイテムが必要です。',
    ],
    'min_digits' => ':attributeは、:min桁以上の数字でなければいけません。',
    'multiple_of' => ':attributeは:valueの倍数である必要があります。',
    'not_in' => '',
    'not_regex' => '',
    'numeric' => '',
    'password' => [
        'letters' => ':attributeは文字を1文字以上含める必要があります。',
        'mixed' => ':attributeは大文字と小文字をそれぞれ1文字以上含める必要があります。',
        'numbers' => ':attributeは数字を1文字以上含める必要があります。',
        'symbols' => ':attributeは記号を1文字以上含める必要があります。',
        'uncompromised' => ':attributeは情報漏洩した可能性があります。他の:attributeを選択してください。',
    ],
    'present' => ':attributeが存在している必要があります。',
    'prohibited' => ':attributeの入力は禁止されています。',
    'prohibited_if' => ':otherが:valueの場合は、:Attributeの入力が禁止されています。',
    'prohibited_unless' => ':otherが:valuesでない限り、:Attributeの入力は禁止されています。',
    'prohibits' => ':otherが存在している場合、:Attributeの入力は禁止されています。',
    'regex' => '',
    'required' => '',
    'required_array_keys' => ':attributeには、:valuesのエントリを含める必要があります。',
    'required_if' => ':otherが:valueの場合、:attributeを指定してください。',
    'required_if_accepted' => ':otherを承認した場合、:attributeは必須項目です。',
    'required_unless' => ':otherが:values以外の場合、:attributeは必須項目です。',
    'required_with' => ':valuesが入力されている場合、:attributeは必須項目です。',
    'required_with_all' => ':valuesが全て指定されている場合、:attributeは必須項目です。',
    'required_without' => ':valuesが入力されていない場合、:attributeは必須項目です。',
    'required_without_all' => ':valuesが全て指定されていない場合、:attributeを指定してください。',
    'same' => ':attributeと:otherが一致しません。',
    'size' => [
        'numeric' => ':attributeは:sizeでなければなりません。',
        'file' => '',
        'string' => ':attributeは:size文字でなければなりません。',
        'array' => ':attributeには:sizeが含まれている必要があります。',
    ],
    'starts_with' => ':attributeは:valuesのいずれかで始まる必要があります。',
    'string' => '',
    'timezone' => ':attributeは有効なタイムゾーンでなければなりません。',
    'unique' => '',
    'uploaded' => ':attributeのアップロードに失敗しました。',
    'uppercase' => ':attributeは、大文字で入力してください。',
    'url' => ':attributeは有効なURLでなければなりません。',
    'ulid' => ':attributeは、有効なULIDでなければいけません。',
    'uuid' => ':attributeは有効なUUIDでなければなりません。',
    'in_future' => ':attributeは本日より後である必要があります。',
    'in_past' => ':attributeは本日より前である必要があります。',
    'hiragana' => ':attributeひらがなで書いてください。',
    'katakana' => ':attributeカタカナでなければなりません。',
    'phone_number' => ':attribute電話番号でなければなりません。',
    'password_with_pattern' => ':attributeは8文字以上で、少なくとも1つの大文字、1つの小文字、1つの数字、1つの特殊文字を含める必要があります。',
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
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
