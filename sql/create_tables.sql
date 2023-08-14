CREATE TABLE public."user" (
	id serial NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	email varchar NOT NULL,
	avatar text NULL, 
	created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT user_pk PRIMARY KEY (id)
);

CREATE TABLE public.biodata_user (
	id serial NOT NULL,
	umur integer NULL,
	city varchar NULL,
	country varchar NULL,
	user_id integer NOT NULL,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT biodata_user_pk PRIMARY KEY (id),
	CONSTRAINT biodata_user_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE
);

CREATE TABLE public.gamelist (
	gameid serial4 NOT NULL,
	game_name varchar NOT NULL,
	game_description varchar NULL,
	game_image_url varchar NULL,
	game_url varchar NULL,
	game_type varchar NULL,
	CONSTRAINT gamelist_pk PRIMARY KEY (gameid),
	CONSTRAINT gamelist_un UNIQUE (game_name),
	CONSTRAINT gamelist_unurl UNIQUE (game_url)
);

CREATE TABLE public.history (
	id serial NOT NULL,
	user_id integer NOT NULL,
	game_id integer NOT NULL,
	total_ronde integer,
	user_skor integer,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT history_pk PRIMARY KEY (id),
	CONSTRAINT history_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE,
	CONSTRAINT history_fk2 FOREIGN KEY (game_id) REFERENCES public.gamelist(gameid) ON UPDATE CASCADE
);