package model



type Blog struct {
	ID    uint   `json:"id" gorm:"primaryKey"`
	
	Title string `json:"title" gorm:"not null; size:255"`
	Post  string `json:"post" gorm:"not null; type:longtext"`
	Image string `json:"image" gorm:"null;column:image;size:255"`
}
