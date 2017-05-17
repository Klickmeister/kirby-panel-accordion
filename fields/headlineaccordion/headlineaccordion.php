<?php
class HeadlineaccordionField extends BaseField {
	static public $fieldname = 'headlineaccordion';
	static public $assets = array(
		'js' => array(
			'script.js'
		),
		'css' => array(
			'style.css'
		)
	);

	public function element() {
		$element = parent::element();
		$element->data('field', self::$fieldname);
		return $element;
	}
}
