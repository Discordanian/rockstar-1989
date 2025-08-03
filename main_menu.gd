extends Control

var primary_scene = preload("res://primary.tscn").instantiate()

func _options_pressed() -> void:
	print("Options button pressed")


func _exit_pressed() -> void:
	print("Exit button pressed")
	get_tree().quit()


func _start_pressed() -> void:
	print("Start button pressed")
	get_tree().get_root().add_child(primary_scene)
