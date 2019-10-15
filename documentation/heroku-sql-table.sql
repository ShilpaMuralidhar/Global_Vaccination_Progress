-- Table: public.wuenic

-- DROP TABLE public.wuenic;

CREATE TABLE public.wuenic
(    "Index" character varying(75) NOT NULL,
    "Country" character varying(75) COLLATE pg_catalog."default",
    "Year" smallint,
    "Vaccine" character varying(25) COLLATE pg_catalog."default",
    "Subgroup" character varying(25) COLLATE pg_catalog."default",
    "Coverage" smallint,
    "Vaccinated" bigint,
    "Target" bigint,

    CONSTRAINT wuenic_pkey PRIMARY KEY ("Index")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.wuenic
    OWNER to eipxrnyyfzxwaw;
COMMENT ON TABLE public.wuenic
    IS 'WHO/UNICEF estimates of national immunization coverage, 2018 revision';