PGDMP                           {            mineria    15.3    15.3 '    7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            :           1262    16398    mineria    DATABASE     z   CREATE DATABASE mineria WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE mineria;
                postgres    false            �            1259    16537    camion    TABLE     n   CREATE TABLE public.camion (
    idcamion integer NOT NULL,
    idflota integer NOT NULL,
    patente text
);
    DROP TABLE public.camion;
       public         heap    postgres    false            �            1259    16556    destino    TABLE     n   CREATE TABLE public.destino (
    iddestino integer NOT NULL,
    idrajo integer NOT NULL,
    nombre text
);
    DROP TABLE public.destino;
       public         heap    postgres    false            �            1259    16530    flota    TABLE     M   CREATE TABLE public.flota (
    idflota integer NOT NULL,
    nombre text
);
    DROP TABLE public.flota;
       public         heap    postgres    false            �            1259    16580    origen    TABLE     l   CREATE TABLE public.origen (
    idorigen integer NOT NULL,
    idzona integer NOT NULL,
    nombre text
);
    DROP TABLE public.origen;
       public         heap    postgres    false            �            1259    16549    rajo    TABLE     K   CREATE TABLE public.rajo (
    idrajo integer NOT NULL,
    nombre text
);
    DROP TABLE public.rajo;
       public         heap    postgres    false            �            1259    16629 	   solicitud    TABLE     �   CREATE TABLE public.solicitud (
    idsolicitud integer NOT NULL,
    idusuario integer NOT NULL,
    estado boolean,
    fecha date
);
    DROP TABLE public.solicitud;
       public         heap    postgres    false            �            1259    16622    usuario    TABLE     �   CREATE TABLE public.usuario (
    idusuario integer NOT NULL,
    nombre text,
    apellido text,
    correo text,
    pass text,
    tipousuario integer
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    16592    viaje    TABLE     �   CREATE TABLE public.viaje (
    idviaje integer NOT NULL,
    idcamion integer NOT NULL,
    idorigen integer NOT NULL,
    iddestino integer NOT NULL,
    fecha date,
    ciclo integer,
    tonelaje double precision,
    material text
);
    DROP TABLE public.viaje;
       public         heap    postgres    false            �            1259    16568    zona    TABLE     h   CREATE TABLE public.zona (
    idzona integer NOT NULL,
    idrajo integer NOT NULL,
    nombre text
);
    DROP TABLE public.zona;
       public         heap    postgres    false            -          0    16537    camion 
   TABLE DATA           <   COPY public.camion (idcamion, idflota, patente) FROM stdin;
    public          postgres    false    215   �*       /          0    16556    destino 
   TABLE DATA           <   COPY public.destino (iddestino, idrajo, nombre) FROM stdin;
    public          postgres    false    217   �+       ,          0    16530    flota 
   TABLE DATA           0   COPY public.flota (idflota, nombre) FROM stdin;
    public          postgres    false    214   �,       1          0    16580    origen 
   TABLE DATA           :   COPY public.origen (idorigen, idzona, nombre) FROM stdin;
    public          postgres    false    219   -       .          0    16549    rajo 
   TABLE DATA           .   COPY public.rajo (idrajo, nombre) FROM stdin;
    public          postgres    false    216   4-       4          0    16629 	   solicitud 
   TABLE DATA           J   COPY public.solicitud (idsolicitud, idusuario, estado, fecha) FROM stdin;
    public          postgres    false    222   n-       3          0    16622    usuario 
   TABLE DATA           Y   COPY public.usuario (idusuario, nombre, apellido, correo, pass, tipousuario) FROM stdin;
    public          postgres    false    221   �-       2          0    16592    viaje 
   TABLE DATA           i   COPY public.viaje (idviaje, idcamion, idorigen, iddestino, fecha, ciclo, tonelaje, material) FROM stdin;
    public          postgres    false    220   �-       0          0    16568    zona 
   TABLE DATA           6   COPY public.zona (idzona, idrajo, nombre) FROM stdin;
    public          postgres    false    218   �-       �           2606    16543    camion camion_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.camion
    ADD CONSTRAINT camion_pkey PRIMARY KEY (idcamion);
 <   ALTER TABLE ONLY public.camion DROP CONSTRAINT camion_pkey;
       public            postgres    false    215            �           2606    16562    destino destino_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.destino
    ADD CONSTRAINT destino_pkey PRIMARY KEY (iddestino);
 >   ALTER TABLE ONLY public.destino DROP CONSTRAINT destino_pkey;
       public            postgres    false    217            �           2606    16536    flota flota_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.flota
    ADD CONSTRAINT flota_pkey PRIMARY KEY (idflota);
 :   ALTER TABLE ONLY public.flota DROP CONSTRAINT flota_pkey;
       public            postgres    false    214            �           2606    16586    origen origen_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.origen
    ADD CONSTRAINT origen_pkey PRIMARY KEY (idorigen);
 <   ALTER TABLE ONLY public.origen DROP CONSTRAINT origen_pkey;
       public            postgres    false    219            �           2606    16555    rajo rajo_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.rajo
    ADD CONSTRAINT rajo_pkey PRIMARY KEY (idrajo);
 8   ALTER TABLE ONLY public.rajo DROP CONSTRAINT rajo_pkey;
       public            postgres    false    216            �           2606    16633    solicitud solicitud_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.solicitud
    ADD CONSTRAINT solicitud_pkey PRIMARY KEY (idsolicitud);
 B   ALTER TABLE ONLY public.solicitud DROP CONSTRAINT solicitud_pkey;
       public            postgres    false    222            �           2606    16628    usuario usuario_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (idusuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    221            �           2606    16598    viaje viaje_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_pkey PRIMARY KEY (idviaje);
 :   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_pkey;
       public            postgres    false    220            �           2606    16574    zona zona_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.zona
    ADD CONSTRAINT zona_pkey PRIMARY KEY (idzona);
 8   ALTER TABLE ONLY public.zona DROP CONSTRAINT zona_pkey;
       public            postgres    false    218            �           2606    16544    camion camion_idflota_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.camion
    ADD CONSTRAINT camion_idflota_fkey FOREIGN KEY (idflota) REFERENCES public.flota(idflota);
 D   ALTER TABLE ONLY public.camion DROP CONSTRAINT camion_idflota_fkey;
       public          postgres    false    215    214    3205            �           2606    16563    destino destino_idrajo_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.destino
    ADD CONSTRAINT destino_idrajo_fkey FOREIGN KEY (idrajo) REFERENCES public.rajo(idrajo);
 E   ALTER TABLE ONLY public.destino DROP CONSTRAINT destino_idrajo_fkey;
       public          postgres    false    217    216    3209            �           2606    16587    origen origen_idzona_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.origen
    ADD CONSTRAINT origen_idzona_fkey FOREIGN KEY (idzona) REFERENCES public.zona(idzona);
 C   ALTER TABLE ONLY public.origen DROP CONSTRAINT origen_idzona_fkey;
       public          postgres    false    3213    219    218            �           2606    16634 "   solicitud solicitud_idusuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitud
    ADD CONSTRAINT solicitud_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario);
 L   ALTER TABLE ONLY public.solicitud DROP CONSTRAINT solicitud_idusuario_fkey;
       public          postgres    false    3219    222    221            �           2606    16599    viaje viaje_idcamion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_idcamion_fkey FOREIGN KEY (idcamion) REFERENCES public.camion(idcamion);
 C   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_idcamion_fkey;
       public          postgres    false    220    215    3207            �           2606    16609    viaje viaje_iddestino_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_iddestino_fkey FOREIGN KEY (iddestino) REFERENCES public.destino(iddestino);
 D   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_iddestino_fkey;
       public          postgres    false    220    3211    217            �           2606    16604    viaje viaje_idorigen_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_idorigen_fkey FOREIGN KEY (idorigen) REFERENCES public.origen(idorigen);
 C   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_idorigen_fkey;
       public          postgres    false    219    3215    220            �           2606    16575    zona zona_idrajo_fkey    FK CONSTRAINT     v   ALTER TABLE ONLY public.zona
    ADD CONSTRAINT zona_idrajo_fkey FOREIGN KEY (idrajo) REFERENCES public.rajo(idrajo);
 ?   ALTER TABLE ONLY public.zona DROP CONSTRAINT zona_idrajo_fkey;
       public          postgres    false    3209    216    218            -   $  x�-�ˑ!C�(�-��>O�����+�e!�k��l�p�rBoĊ���r}�PZ����W�x��6�~a>��bfqh%����C;C�M��ߣG���a�.<t�Okj&q����|��{U���%ca�B����䒈D���iwΛQ>����#���t�A���+r>A*�6�fבU�ȳ�f<'J���9%�Y�Qf����$�(y6vI���w��t4Z�i��'i�c��s�=�\t�a��D�oɲgg�M�����9+��z���/��i�      /   �   x�mQAn�0<�PŁ��G�5`�U���_4 �Ro�Ɍ=���T���\�5�U�ªg�S��9��6������02�e̦
�f��v@�tf����~`Q���M�.Nt�N��wN�Cx�B@s�7�P�w�̑�����Gl�����%\b�x;��'�	���)���O�����eͫ{�^>JYI�� �3�IɳL�z�kwK�)cA[�HI��E���]R��|q*�<?~? ���q�      ,   >   x�3�tvQ0�4Wp�2�������l7.c�7.No_KcW.S�������� ]�      1      x������ � �      .   *   x�3�tpr�r�2���q���2�q������� ��p      4      x������ � �      3      x������ � �      2      x������ � �      0   ?   x�3�4�tpr�r�2�4�t30T��q�2�4���t��2�qsvU0�2�1-�b���� ���     