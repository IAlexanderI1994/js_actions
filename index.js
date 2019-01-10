(function () {
	// Создаем переменную под хранение экшенов
	let actions = {};

	/**
	 * Аналог add_action WordPress
	 * @param action_name
	 * @param callback
	 * @param priority
	 */
	function add_action( action_name, callback, priority ) {
		// Дефолтное значение для приоритета
		if ( !priority || priority < 0 ) {
			priority = 10;
		}

		// Существует ли указанный action
		if ( undefined === actions[ action_name ] ) {
			actions[ action_name ] = [];
		}
		// существует ли указанный приоритет
		if ( undefined === actions[ action_name ][ priority ] ) {
			actions[ action_name ][ priority ] = []
		}
		// является ли колбэк функцией
		if ( 'function' !== typeof callback ) {
			console.log( 'Callback is not a function!' );
			return;
		}
		// если все ОК, добавляем обработчик
		actions[ action_name ][ priority ].push( callback );
	}

	/**
	 * Аналог do_action WordPress
	 * @param action_name
	 * @param data
	 */
	function do_action( action_name, data ) {
		// смотрим массив функций по приоритету
		if ( Array.isArray( actions[ action_name ] ) ) {
			actions[ action_name ].forEach( function ( callbacks ) {
				// запускаем функии данного приоритета
				if ( Array.isArray( callbacks ) ) {

					callbacks.forEach( function ( callback ) {
						// если данные переданы через do_action - прокидываем их, иначе - вызываем функцию без
						// параметров
						undefined === data ? callback.call( this ) : callback.call( this, data );
					} );
				}

			} );
		}

	}
})();