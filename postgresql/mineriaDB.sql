PGDMP                         {         	   mineriaDB    15.3    15.3 9    i           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            j           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            k           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            l           1262    32243 	   mineriaDB    DATABASE     ~   CREATE DATABASE "mineriaDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "mineriaDB";
                postgres    false                        3079    32365 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            m           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    32251    camion    TABLE     n   CREATE TABLE public.camion (
    idcamion integer NOT NULL,
    idflota integer NOT NULL,
    patente text
);
    DROP TABLE public.camion;
       public         heap    postgres    false            �            1259    32306    carguio    TABLE     Q   CREATE TABLE public.carguio (
    idcarguio integer NOT NULL,
    nombre text
);
    DROP TABLE public.carguio;
       public         heap    postgres    false            �            1259    32270    destino    TABLE     n   CREATE TABLE public.destino (
    iddestino integer NOT NULL,
    idrajo integer NOT NULL,
    nombre text
);
    DROP TABLE public.destino;
       public         heap    postgres    false            �            1259    32313    fecha    TABLE     L   CREATE TABLE public.fecha (
    idfecha integer NOT NULL,
    fecha date
);
    DROP TABLE public.fecha;
       public         heap    postgres    false            �            1259    32244    flota    TABLE     M   CREATE TABLE public.flota (
    idflota integer NOT NULL,
    nombre text
);
    DROP TABLE public.flota;
       public         heap    postgres    false            �            1259    32350    kpi    TABLE     �   CREATE TABLE public.kpi (
    idkpi integer NOT NULL,
    idzona integer NOT NULL,
    idfecha integer NOT NULL,
    esperado double precision
);
    DROP TABLE public.kpi;
       public         heap    postgres    false            �            1259    32294    origen    TABLE     l   CREATE TABLE public.origen (
    idorigen integer NOT NULL,
    idzona integer NOT NULL,
    nombre text
);
    DROP TABLE public.origen;
       public         heap    postgres    false            �            1259    32263    rajo    TABLE     K   CREATE TABLE public.rajo (
    idrajo integer NOT NULL,
    nombre text
);
    DROP TABLE public.rajo;
       public         heap    postgres    false            �            1259    32318    viaje    TABLE     A  CREATE TABLE public.viaje (
    idviaje integer NOT NULL,
    idcarguio integer NOT NULL,
    idfecha integer NOT NULL,
    idcamion integer NOT NULL,
    idorigen integer NOT NULL,
    iddestino integer NOT NULL,
    ciclos integer,
    tonelaje double precision,
    tonelajereal double precision,
    material text
);
    DROP TABLE public.viaje;
       public         heap    postgres    false            �            1259    32282    zona    TABLE     h   CREATE TABLE public.zona (
    idzona integer NOT NULL,
    idrajo integer NOT NULL,
    nombre text
);
    DROP TABLE public.zona;
       public         heap    postgres    false            �            1259    32397 
   prekpirajo    VIEW     }  CREATE VIEW public.prekpirajo AS
 SELECT protokpirajo.rajonombre,
    protokpirajo.fecha,
    protokpirajo.idfecha,
    sum(protokpirajo."real") AS rajoreal,
    sum(protokpirajo.esperado) AS esperadokpi
   FROM ( SELECT viaje.idfecha,
            fecha.fecha,
            zona.idrajo,
            rajo.nombre AS rajonombre,
            zona.nombre AS zonanombre,
            sum(viaje.tonelaje) AS "real",
            kpi.esperado
           FROM (((((public.viaje
             JOIN public.origen ON ((viaje.idorigen = origen.idorigen)))
             JOIN public.zona ON ((origen.idzona = zona.idzona)))
             JOIN public.rajo ON ((zona.idrajo = rajo.idrajo)))
             JOIN public.kpi ON (((viaje.idfecha = kpi.idfecha) AND (zona.idzona = kpi.idzona))))
             JOIN public.fecha ON ((viaje.idfecha = fecha.idfecha)))
          GROUP BY viaje.idfecha, fecha.fecha, zona.idrajo, rajo.nombre, kpi.esperado, zona.nombre
          ORDER BY zona.idrajo, viaje.idfecha) protokpirajo
  GROUP BY protokpirajo.rajonombre, protokpirajo.fecha, protokpirajo.idfecha, protokpirajo.idrajo
  ORDER BY protokpirajo.rajonombre, protokpirajo.fecha;
    DROP VIEW public.prekpirajo;
       public          postgres    false    219    217    217    219    219    220    220    222    222    223    223    223    224    224    224            �            1259    32402 
   prekpizona    VIEW     �  CREATE VIEW public.prekpizona AS
 SELECT fecha.fecha,
    viaje.idfecha,
    zona.idrajo,
    rajo.nombre AS rajonombre,
    kpi.idzona,
    zona.nombre AS zonanombre,
    sum(viaje.tonelaje) AS "real",
    kpi.esperado
   FROM (((((public.viaje
     JOIN public.origen ON ((viaje.idorigen = origen.idorigen)))
     JOIN public.zona ON ((origen.idzona = zona.idzona)))
     JOIN public.rajo ON ((zona.idrajo = rajo.idrajo)))
     JOIN public.kpi ON (((viaje.idfecha = kpi.idfecha) AND (zona.idzona = kpi.idzona))))
     JOIN public.fecha ON ((viaje.idfecha = fecha.idfecha)))
  GROUP BY viaje.idfecha, fecha.fecha, zona.idrajo, rajo.nombre, kpi.idzona, zona.nombre, kpi.esperado
  ORDER BY zona.idrajo, kpi.idzona, viaje.idfecha;
    DROP VIEW public.prekpizona;
       public          postgres    false    219    217    220    220    222    222    219    217    224    224    223    223    223    224    219            �            1259    32386 	   solicitud    TABLE     �   CREATE TABLE public.solicitud (
    idsolicitud uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    idusuario uuid NOT NULL,
    fecha date
);
    DROP TABLE public.solicitud;
       public         heap    postgres    false    2            �            1259    32376    usuario    TABLE       CREATE TABLE public.usuario (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    correo character varying(255),
    nombre character varying(255),
    apellido character varying(255),
    pass character varying(255),
    tipousuario integer,
    estado integer
);
    DROP TABLE public.usuario;
       public         heap    postgres    false    2            \          0    32251    camion 
   TABLE DATA           <   COPY public.camion (idcamion, idflota, patente) FROM stdin;
    public          postgres    false    216   IF       a          0    32306    carguio 
   TABLE DATA           4   COPY public.carguio (idcarguio, nombre) FROM stdin;
    public          postgres    false    221   �G       ^          0    32270    destino 
   TABLE DATA           <   COPY public.destino (iddestino, idrajo, nombre) FROM stdin;
    public          postgres    false    218   H       b          0    32313    fecha 
   TABLE DATA           /   COPY public.fecha (idfecha, fecha) FROM stdin;
    public          postgres    false    222    I       [          0    32244    flota 
   TABLE DATA           0   COPY public.flota (idflota, nombre) FROM stdin;
    public          postgres    false    215   =I       d          0    32350    kpi 
   TABLE DATA           ?   COPY public.kpi (idkpi, idzona, idfecha, esperado) FROM stdin;
    public          postgres    false    224   �I       `          0    32294    origen 
   TABLE DATA           :   COPY public.origen (idorigen, idzona, nombre) FROM stdin;
    public          postgres    false    220   @K       ]          0    32263    rajo 
   TABLE DATA           .   COPY public.rajo (idrajo, nombre) FROM stdin;
    public          postgres    false    217   M       f          0    32386 	   solicitud 
   TABLE DATA           B   COPY public.solicitud (idsolicitud, idusuario, fecha) FROM stdin;
    public          postgres    false    226   RM       e          0    32376    usuario 
   TABLE DATA           Z   COPY public.usuario (id, correo, nombre, apellido, pass, tipousuario, estado) FROM stdin;
    public          postgres    false    225   oM       c          0    32318    viaje 
   TABLE DATA           �   COPY public.viaje (idviaje, idcarguio, idfecha, idcamion, idorigen, iddestino, ciclos, tonelaje, tonelajereal, material) FROM stdin;
    public          postgres    false    223   �M       _          0    32282    zona 
   TABLE DATA           6   COPY public.zona (idzona, idrajo, nombre) FROM stdin;
    public          postgres    false    219   ��       �           2606    32257    camion camion_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.camion
    ADD CONSTRAINT camion_pkey PRIMARY KEY (idcamion);
 <   ALTER TABLE ONLY public.camion DROP CONSTRAINT camion_pkey;
       public            postgres    false    216            �           2606    32312    carguio carguio_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.carguio
    ADD CONSTRAINT carguio_pkey PRIMARY KEY (idcarguio);
 >   ALTER TABLE ONLY public.carguio DROP CONSTRAINT carguio_pkey;
       public            postgres    false    221            �           2606    32276    destino destino_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.destino
    ADD CONSTRAINT destino_pkey PRIMARY KEY (iddestino);
 >   ALTER TABLE ONLY public.destino DROP CONSTRAINT destino_pkey;
       public            postgres    false    218            �           2606    32317    fecha fecha_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.fecha
    ADD CONSTRAINT fecha_pkey PRIMARY KEY (idfecha);
 :   ALTER TABLE ONLY public.fecha DROP CONSTRAINT fecha_pkey;
       public            postgres    false    222            �           2606    32250    flota flota_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.flota
    ADD CONSTRAINT flota_pkey PRIMARY KEY (idflota);
 :   ALTER TABLE ONLY public.flota DROP CONSTRAINT flota_pkey;
       public            postgres    false    215            �           2606    32354    kpi kpi_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.kpi
    ADD CONSTRAINT kpi_pkey PRIMARY KEY (idkpi);
 6   ALTER TABLE ONLY public.kpi DROP CONSTRAINT kpi_pkey;
       public            postgres    false    224            �           2606    32300    origen origen_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.origen
    ADD CONSTRAINT origen_pkey PRIMARY KEY (idorigen);
 <   ALTER TABLE ONLY public.origen DROP CONSTRAINT origen_pkey;
       public            postgres    false    220            �           2606    32269    rajo rajo_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.rajo
    ADD CONSTRAINT rajo_pkey PRIMARY KEY (idrajo);
 8   ALTER TABLE ONLY public.rajo DROP CONSTRAINT rajo_pkey;
       public            postgres    false    217            �           2606    32391    solicitud solicitud_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.solicitud
    ADD CONSTRAINT solicitud_pkey PRIMARY KEY (idsolicitud);
 B   ALTER TABLE ONLY public.solicitud DROP CONSTRAINT solicitud_pkey;
       public            postgres    false    226            �           2606    32385    usuario usuario_correo_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);
 D   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_correo_key;
       public            postgres    false    225            �           2606    32383    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    225            �           2606    32324    viaje viaje_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_pkey PRIMARY KEY (idviaje);
 :   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_pkey;
       public            postgres    false    223            �           2606    32288    zona zona_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.zona
    ADD CONSTRAINT zona_pkey PRIMARY KEY (idzona);
 8   ALTER TABLE ONLY public.zona DROP CONSTRAINT zona_pkey;
       public            postgres    false    219            �           2606    32258    camion camion_idflota_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.camion
    ADD CONSTRAINT camion_idflota_fkey FOREIGN KEY (idflota) REFERENCES public.flota(idflota);
 D   ALTER TABLE ONLY public.camion DROP CONSTRAINT camion_idflota_fkey;
       public          postgres    false    216    215    3238            �           2606    32277    destino destino_idrajo_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.destino
    ADD CONSTRAINT destino_idrajo_fkey FOREIGN KEY (idrajo) REFERENCES public.rajo(idrajo);
 E   ALTER TABLE ONLY public.destino DROP CONSTRAINT destino_idrajo_fkey;
       public          postgres    false    217    218    3242            �           2606    32360    kpi kpi_idfecha_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.kpi
    ADD CONSTRAINT kpi_idfecha_fkey FOREIGN KEY (idfecha) REFERENCES public.fecha(idfecha);
 >   ALTER TABLE ONLY public.kpi DROP CONSTRAINT kpi_idfecha_fkey;
       public          postgres    false    222    3252    224            �           2606    32355    kpi kpi_idzona_fkey    FK CONSTRAINT     t   ALTER TABLE ONLY public.kpi
    ADD CONSTRAINT kpi_idzona_fkey FOREIGN KEY (idzona) REFERENCES public.zona(idzona);
 =   ALTER TABLE ONLY public.kpi DROP CONSTRAINT kpi_idzona_fkey;
       public          postgres    false    219    224    3246            �           2606    32301    origen origen_idzona_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.origen
    ADD CONSTRAINT origen_idzona_fkey FOREIGN KEY (idzona) REFERENCES public.zona(idzona);
 C   ALTER TABLE ONLY public.origen DROP CONSTRAINT origen_idzona_fkey;
       public          postgres    false    219    220    3246            �           2606    32392 "   solicitud solicitud_idusuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitud
    ADD CONSTRAINT solicitud_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuario(id);
 L   ALTER TABLE ONLY public.solicitud DROP CONSTRAINT solicitud_idusuario_fkey;
       public          postgres    false    225    3260    226            �           2606    32335    viaje viaje_idcamion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_idcamion_fkey FOREIGN KEY (idcamion) REFERENCES public.camion(idcamion);
 C   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_idcamion_fkey;
       public          postgres    false    223    216    3240            �           2606    32325    viaje viaje_idcarguio_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_idcarguio_fkey FOREIGN KEY (idcarguio) REFERENCES public.carguio(idcarguio);
 D   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_idcarguio_fkey;
       public          postgres    false    3250    223    221            �           2606    32345    viaje viaje_iddestino_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_iddestino_fkey FOREIGN KEY (iddestino) REFERENCES public.destino(iddestino);
 D   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_iddestino_fkey;
       public          postgres    false    218    223    3244            �           2606    32330    viaje viaje_idfecha_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_idfecha_fkey FOREIGN KEY (idfecha) REFERENCES public.fecha(idfecha);
 B   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_idfecha_fkey;
       public          postgres    false    223    3252    222            �           2606    32340    viaje viaje_idorigen_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_idorigen_fkey FOREIGN KEY (idorigen) REFERENCES public.origen(idorigen);
 C   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_idorigen_fkey;
       public          postgres    false    3248    223    220            �           2606    32289    zona zona_idrajo_fkey    FK CONSTRAINT     v   ALTER TABLE ONLY public.zona
    ADD CONSTRAINT zona_idrajo_fkey FOREIGN KEY (idrajo) REFERENCES public.rajo(idrajo);
 ?   ALTER TABLE ONLY public.zona DROP CONSTRAINT zona_idrajo_fkey;
       public          postgres    false    217    219    3242            \   ?  x�-�;n�@и�0��μ�$��ϱT��Fb�D�,Y/9Ч��X�jVG��5��>�p�C�.뺡Bt�jL�N(4�&�"��Aѷ��c�o����L�19��p�#`L��19:�ɱ᲼q�� nD��	��$
^D�o���9�A	BV<s�A��6J��"F��+�FݻG�8�Eʨ���@�(�>*d�.2�~��Q��Fːg�)3�����u�|~����(��(������8�N�\��]5��gG6��su�^�-��]�u���������)�,��O�a�Ij�'u��� ���s�      a   g   x��1�@D�:�0�c;�DD)�����̳,yl����3�/�X�L�2�ɱ�q�4f#d����2P����^hu��:/�eߏ����*�w�?�6      ^   �   x�e�Kn� �����:�N�$@Դ" R���-�1͢;����VZM�6n�-ku s���q�L��M�L+���2FE�~������='�ʯq>�ƚ	!�&����/׃D�$7�*����IUi5�~��_�$	����A���q5A��GE� o1�7�8�Β�g��'����k�x�M���[VнK�`��S���bS-������s��VY�      b   -   x�3�4202�50�50�2Dp���c.cǄ��1����� ���      [   m   x�=�A@0E����'�RT��A�ZX����Aw��y3�U]��βB�e�I��O#��������<�
Ͳ��_�&�UC'U+��$O�",N���'��;�<�G . ��      d   v  x�U�[�� �o{0~�����ns�Jm�\�-v��*+)z�[�&��lk���3(�l��ι�����6�\T�����6�t��B���(fZ�FI{�X���aR��2/�"t�֧Vr�
Łɕ*�枓��	�R�(�{-@�цD�$zAyC�R�bk3rK��q��a�M�mE�=�ԋ�6��&��+1j�ӟ���5�+�b{6$��lS��-l�ӎ�/'���J|_���Hu������_c����(�a�7���c����1t �x��������Ɓ�?��E�2+XA8����ܡ2�؜��h8:4`�؈_q�fx]��Ǉ��A��`�,3~���ef*�W{j�Ӗ	���Va���N�O��?�z�      `   �  x�m�Mn�0���]&�d/����;�8�,
���蛱T���H��#)N���w~�U�s� �V�$Ϊs��&d=u&O���۷���vݗm�H�Eօʿ�L4���tCZC,)�:�47��l#�n&�&s6v�UKqR="(�$>x:G�N*p�1$�}m�<����s��N}H����f9�(�Z�OH�W�"��e����?�%�t���QP�K@
���H�!Gs�N�~�4��Ѐ9�4���}���J��q9�vߎ#�Y�]���Cɢ%AV�Vï�O�Ѓl4��sC��Ch��w��u@�?6������n����d�Fxi��ýx�Oϖ_>�]&��yZ/���	n�OiBz@�_�Ba=�ћ�v����cN�:���"F��
�ك���N$)|���s���
�f�gR�Ņl�҂���_���      ]   <   x�3�tpr�r�2D��C���8C\������9}|���L8]��C]�B�b1z\\\ ��      f      x������ � �      e      x������ � �      c      x���ˮ59r�ǧ����d#y'�%H0t���6�I�-	�%�~{��$�-c�����c� ��d2#��k��#Ԍ������������������9@����� ��?�������8�G��� ��'�|G�f2l�ޔ+4�o6�D���,t��j�nP�.�Q'=�&���V�=��<HƪtRY�w�;+RU�Ѫ���E
8�
]v��UQ��c`����yL�`�@s�rs�4^$sy���j����"�v�m?����(�4��lo��e/AT��hX�<a7(��Ś��IQ�.�hɀA��ޭ�+s�\��x)J4-B�bwY�2v���Ũ(cK,�1oԘ@�(ʸ�kں�?|���nST��7t�M�fnuY�Z�^ҝ��]L3���ov�`7.�n�t�hR�a�����w"{����+�*gh�(X�8�?�<h�e��0�"if���R�'���ݡq��gN�1Rg��&E�7�h��=aW4���+��Q��ʥ(�B�f�GwӴ�7j� ���z����h�h�S�zԜQ��Ь��U��L@�:я;`h�&l�!Q��C�^�4z�:���W�,3���~��Ш(よ��=�j�h�+}�i(_Q�,y�gE��>h���m�,_�v)J��&�%���=`h�l!4�v/��(�4+�f-+�؅j�����M��Bǟ��E�B��/����������]!^V��{�ˣ|��%�1LZ����@;�#㈻�Љ��.?b}t\E���B7�v�t
��Yh��E���"e|-Z�Q2�>{e���v�]Ǯ�7�����������Mz��q�9��:pt:M����R�<
^8�I�:iY��t����~�G���[&���B{1ݽz��������<b7�E�n)}�-Z�Ĺ�E�>�v����a���磰n��o瓰~�����Y���N狰q���N竰��ۄ-��p	[��'l#�7����Ÿ+�%ǰ"[�n�\�R`X�-EB� �%F� ���>��pE�$�+�C�Ɗl�ZıF�)4�V��#��)��ʮ��X�bXn>/���$4ww��ӑ��\]')?�R�ˬt���W�#u��ʦ�f�߶<\���+���kmrBꚜDˤR�G�3��HI�)�E]�SR:}����"e���4sEN�$.m�9�����nݲH�۫a�����N_���$C�L��,R��y�f��вR�2g���΢��V���EK'�I_��õ����f��9�wW��������n�8�)�"��T3�l-b�cȮ����꺽ڻ�����e�=j����س��ۋ���0޵���|��l��m�����-Խ����k�}���fu�u��4\�2��ְPg���q�~Z5Hu�{�����Ӫ�]e��[�Z�:��p�"!B�j�V�Ѯ&re5�*1ZZ��P��M��e��U��1��Zoz/���_n��]L0ow���f��௨�=n�%��`w���fM'D7����"��)K4�A�D(��f�%�;(��ƹ���8�W�(�X(W1\ڬ5��#���[����>�|c!\�Ws��f�U�{���L��3�6k\Ҽ�鉶y���?��fݘ��QQ����ybH��YKb/��@I_7k�7/�y���õYk
��L��7k� �21$Cܬi��nެ�Э2v�f��7@7fj�k��x�NYb��"\j� �"\�W�G1|��u+}��zd�G�Fz�.�5x��Wl7���m�j[�B��ף-�X.$�7���f�[f|����,A��؅n�aq���Sݬ��n9v�YK���)֌g��o�_�x�G���R��2�Y��;8����i���Ѯŏ��c�՜��S��2��]�c8wr����������Y~�46��8�2iG�m��[n_pʷ��i�v�ُ-�	Ӹ��u�Sj�L��s����W�q�E��i��ױUz9�u�(�1�cQ�gX���Z�۬����E{��
s ��Pq�i�?�_4�T�2M�V�{5/�V�����.��ZU���v-ږ����_�M���9R�����_�$��Ϩ��|��1wk���d���>�7��1��K�H��{��	��O$��D�BV�����FBG�=\��]eo�r�AGj�&8�E��6=��NW���ࠣ��'�Q�����ݝNIf�s�S�l'm����>0��;i�6��Ԅ���S��Ǔ6=���P��6m���[M��٨����j|���s��g8���kT~��}Z���S��I�O!@�|���yӔ��4D���a^Q�\�O^/���>���5�{�DմQ��|I8�7����᤭���J1�X{Ŵ�bΊ��?��s,�.���|~��!m�ń�%�g�HN�����[���`�h)&��^ÔLXV	)�u��e(X3l�ƽ��l�����&K�&�����":���5Ns�4���H�֩��@IG�{ŝ�5��jY(��M�qӶ�E��LղQ~�M�@K13�@�1+�Vu]u����'�m���BK�y6]�Y\��̜�餭qR�mu*���L���MOڦmO�j���nn���n�e�l�M�U��h�T�*#�~��i[��Z6f6��i�Oڦ��/h�O��6m�2^zǳ�o��⥷<���t��e>�i߿K�Ҧ	��2p�˦	��2�=�nlCː�A�P�8��s���v�e�<Q-e;J���TԬ9ѥE��z���7�(���N�'t�<iB�	�.�v�&�I��o?���O�\����>.��R�/k/��=�L��H9al)=�߶~C��ӬOlc�Nڲܢ	O�t�8�� h�EC�>=�'74�t��U�FyR�����*Z̆۷m1@��:B��-�.��-��-3f�8���o4�-C<f�w�Ӣ���mL�򍆖�}%�	���.z)��BU���I����I�l���/��Z�ת:.z���Ǝ��o4�d�������f`ı�������1U��P��53��w�@��n?ڌف��#ك�D���i��+�(����4�L\���HI�Yul�z�ES����Ǡ!bbj����;��<3>
DL��(i�Č)1Q��*2��b��NN
�/
�-���Px���E�tu��7��c��.1w:����]C�������EU�2�CTF=�r̮�3NCưf}�nԶ`�*� #���ߺ4�`�4dd�����_7�@E�0YlP1Pp^0�D��sE������`�4]�"q�+]�b��#]*"q�+]*bc�P#c9-x]o�����3���TLcc'ɝӤo�b���������Ǝ��&L�뀍���֋��aGȼ5,�{�l��C^A�p^���+&|�l�3�L���-��-��/�u
f�r<`��`[n����$�uu����m�Í{8���q��:}s1C)�ANǌ�Nڴ7mkҦ�>���3�6�M�ԓ6[�6m�wT-�%$�M�}UKj�ưi{�F�2Q�Ӧ�9U�̌�X6MxR7M��Z���ӵiۓ�6m_�?iK��ZV�Sܴ=S�4�jI���l����i{T%h�U3_��mgh��9��N�Z5���Vͬ�:�Q'CK��Ǡ���������i��U�Ĭ��ڴ�|q���آZRkU	�&<���GUQ-�է�M��]T�J�w�4�I۴=��u�V�Tղ1~W�i�6�L���i¶>�\��?�V}
q�~�=wV}�{�~h��((�mzxr�#5h(��mZ��-��LtC�M{�h�w�4�j����u&��i�o}�,�8im���;_�e%�;_n�f��K�l��p�F��+nڜi�J'm�Λ6��k�'R}��]zM����IpJ��p=V��w!���S>�u��Q8�>�%��B{�8�����������'��	�@��S�������:}�}O��D�nY��s��:z�5��AO��V��C^�@2y=uw��}���iO�kϬ'8��犞���$�ד����zr�=�|�{�A%@�I��?�zl1x�8�]=����~:~���k����u?1ah2�Lh    ֖����lb�g��-�r&���1��)�<'`�����1��g��B�ÿ������a�#���������?����f�Q���e)^�"d"��R��ǫG��	�fy)^HQ'19��W)��t���9�L'/����ه$�G�	��N�h~��`�U�|�y��`Ѳy�%I�BB��tDmi�d�c��Ɵ���w�����/�߿�x���#�h*��lv��ݗ���?/x���㑲<fH �󂷅#t�8��P>��冏^G<�0ڇ���SnS�s�y`$J�ǿ��D����Q�?����HENƹ�Z<<ƫ�Y�޻��/ZGȒ��H��02/3���43�L%�˹l���I����r�m�ƖU.eG��8e��Nr����"�h\	��f㊄�����T��.��_��RjlT�R�~ݹ9]h�o|꒗j�W�rNH�	s�3*kR�rS��7�Eb պY���	L�KYfX4L�B�r��2}�0�$���͚^$e�ϗ-���ǌ�&��/�W�gئ,�q��籱p�u� V��fM�AYbu+�0��b�҂��Y��isȕF[�r���j��m���b���A@b�D#��$).(��k1I
%�Qׄ����o�/|}�)X*�[���G����� �AwK�ɰ�����i��[��Ӑ��7O�c>d�rR�j�]*��/�R���tc�-�pz�lu�-H�_�&�)A����>1N	��1z"|d�gD��
2��y������e�t�I��S�ING&,�(���#m��k�F�o�gh���Lv��&�8���f�S9a��8��ދYaf8EQ��LGD�D�(2"�e:���!�)L��)IdL�2���E�:���}I�C����$�]�]��cN���BSB���b��L�w�Y���T����i3�&r����{������x�*��bQW��E''�)�!$5�rQx�=�3����%C�#���tڹ)̌�"JR�8����ϫN�"�.g��j	
�~KW��F_����������K��!���Y�������	E�L�L�������$�^�THI��z��=����0���R����\&��~h}�0�*������&la�h����e[N�G�1���3�7�O^�~Y���h��_m������뗳��~��pC�C���^nEY�/D>$G57em��%�D�z�|)Z�K�����}��U�3�5��{�!����N�^i�x�9X#F���,8r�ן���r,������&ml�J���G��6�Le����ԯ��1����;��[�:3<����7r�~N�x�"'�ʽ:�����s^�1��a-�T�x��N�D�S��z�2QO�Ջ�x�0r�V/R"���w�h��K�Y�I+m�0[Q|�������q�x��c [�T#�EÐ�Y{)ޮ�uLp�E⮧G��>�m�;�]���xo�LN5�a����LN���Vgr��Ae�z�37���}y�A�7x.G?D��:sS	j���35�x&6�Bՙ�JP#�T�����C�μT�Z�E��ӟ}�FQ,D�P�,� �\D*�E�J(�B�x2���	Z�7V�jLԅ�fE0dռw7]��:,�bȪy?�߬iW4CVM�����x�$L?����$�9"�^Mu���MЍH�W�Y���2��eG$��9l�t�	-kN��O�p�$�e�֔�"Zl۬5(.j�E�CB�{�߬ն"�1-k��5^�"�y�RpY�I��ht��|c�fͶA7f��Y�nݐ���nu����B�°Ѝ�C5n��[��ݹּYk�W�--k����|�ɵ��^A�W��nH&y��6�Y#�am�[����k��p���7k�Mtc�T֖7k�MtDb���f����A7"�e��ͺ����ݲ���]^Y���v�p�؍k��d�lWڬi�5���fͶ�yOg��G��nJ���X����)�+���x���#j�����61��Q,����{��J>�p[�����<x�l*̆۰<����d�����t�kO��B9L�X��ћ=�4Ҍ�u���$����3C*6�z�4��e�s�100�E���o�A�LD=l��jn�yk�y�#�����Ŧ��
�o������x�^�lj8ŏo�6�s��I��n8;�B$�ˢ)��'�#@��&��"�F���P1�����x?�t�{�~�Sl�ɉ���"dG�ʯ�{������fA�Z�ѐq�sF���A�^C���N=gL췀Z�ѐ����"T,}�&:�8$�����VEs?^8��+�T�J8�T��t_�m��TGd����~A�7z~�2�3?ch)�qL��,0���SD�9%ܨp�L7О�����I� h:R��dLl9�f�_�5��ACH*�e�PR�Yޫ�ˢ�W���A�P�s=�N�Ҿ@M*�e+PS3Z�>۶�O��jzJ͢j6�������jR�&�C��r��3q+В� �J;i�ѦB�>/�W�Ǹ�P��Cp<��񽆓6}���R�U����d�r+#�����Qne�4芫��I�(��.h��Q�m�e���6m��i��}��&Y��Y�l.'�4
��3T��倍��֠a�:��1:�uA�$���^�UD"�V��A�����LƭNC�F�_����d�:%���{ǡ�s\C���p�Z�N��AP*;d�݉��u^2C��:3��� �Ƈ1Tu���~w�j�Tu�*7 ]=qsD:U�QM�׉�M�P�3�~������C��`O��w�k.7�<T��Ev���)���T�Ȏ�7��J��;qS���&�z8q�f��z����j��'n;��Vj�U�qδ7�G���8T�\�zc�q����C�����F�u�"�`�ӉoL:�wH�kj9q�&��PU Yδ7}OP�x�Ȏ���r&���QU3Ց)����P5�z>q�gTU��ҎW	���o�����=rj��߀�
r��>M��s�Ĺ�g�����W��P��BB&aǳ�����r��c'��u��}����y���}���֍�j:i�%�o�z����w��v��T!�
�x(�W?���(/\���9V�������u�jA;k��B��M��*g�7��f1󥆅s
WU��T�Y�u";GM�
��̟���|�|r�kw���Y�A�p�s�h8߰��54��C��F8k|I��TknO�����Y��Y�K=U�ƚ��ҺpҾ.�^�������]��;ԧ
�rbZ�.U9�(��n�ɾ����x\�Z�n�Q�
*r����p�*�d,�x]85)��35��ؕ��?�Ut���H��a�8��� �ȫ��(t�	׾_[�KB3�:�A�:]�.D�=7���L�n��߽��%���Ӳ�7�V�(;��N`)n��8�`<^Xة#:͸�ڶ���𢡎�����fomږ������[�7wN\�m�I��ȍr���B<h�o�Ŷ�'��m��e�a��&���M�ZfJ��=<�ߧrZV�c8hk�Eh�8����������Ɖufr�>���f[�6N8�܉�֡�c5v<l�q&���DuLRŎ�� ���aIU�\Sۉ�Mͪj�����	g�?q�U���\�'n��qYUer�u<o�P5CU�]�s�812T͞�^��Y܉�+d�+)w�P�Ɖ�����
U=�3y��%��7�XQU�L�8!S�N�����G�*V�ƉYÉ��UUnѫ��ͅ������l�qFU-�N�왦�2�;��2y�:�7N��U��f����s���Z:q�%�kP5���w8T������
�d7�ϥ����;q�AU*�Z���gT��YO�U����IX��qƺ��$s�x۸^������:qS&Uñ,��~�����ըw��ͦ:U�I ��t�u����wW6n�U�����29��:W�t��a &#G����r{~�W����Y�{:�u-��4�c=�/�	ϫH[��v�_|?y=��I�[��~�z�C�xxs�b��A"ID��:J�uM^�u8��"tе2CL�]��#77y>^
snG(����]�~ю    ���+@S�緜���N�m��^�"��e�jL��e�dW�d%�t�-���eAmM����� �+����M)���M�5���O*-�y��eѤy=#L]o��^2M��fv�o2��������&����?����iѤy���#�tY4i^�Mlo���E��ru�� ��-��V�G&�I��A��Y�ɶ����*z�m�ZR�n@n����R�ԍ��er����N�}�rg���g+�q�c�&}I� uþ��<Ըh���M�]�@ڐָ�yV�eќXU��?���][�A�Ҷk�\�4��0=��A�΄E�Ψ��"O�-��L^4'S+g�{յ1cxl:͐:U�]�R[�0�� ��cn~�1k��+��_f�W�����+���f.�.�|���}���<.Xb��w.�18��k�W4��<&�pR����ɋ��r�����������������o��/������ٲ�d|���e�֩��1.��1F�,��kO��V[z��أ�V�A�04��Ԯ��Lp�IC;�檁ܞօ*8لA�L��c��a�8iO�"�������e�Tn�N�I7���o���eݑ��E�y�;��T�RRvz�f=�/�:��(�/���tF4�lG�����.��ĩDU.�_�EU_H\T�R�u\TM�3!n�i*��V�����<����?gaAT��.�"Q�u"8���q�0ͼ�c�<���m���7:���A�gV-�@d��d���'}�V�½u\L�2�ϡ�O<��Bdrc��s�1#��-�]ǋ��{��ә*<�W��Mi�c�B.��$�b%��"h��NH�0����'�E�8�I��5o�i\�R�u�(%�Cxđj��OU��И>��(?y#���)�EQM�d��씶S9v�+���9]��Tf��G��ל�u�Z�#g�ӷ������Q�uQO?3&E7�������������?����cxR.���,�LP��W���3�0��E���*��YC)�Qi����GT])ߚ�ĕD�Yp&-�Yw���TBM��6�a�!g��W��|���EMM1u��^i��g�������VV�SsR�J5�kG�ODL�t�XU���
�N1��B˶h�
ՅM��R� l���C2��^��Z���=I�Is�:'��TV��'�|���B#?��p-(?�E��]%Z��j��6q��YW�x]bY��H�=�w��U#��Ս0�i�*"DkA��a5�]��*�|��:iѕK��q�5q��Kd�]��P��"kJ�(�Nd�ۜ��\'/��w.щ��o�|��.�:�I#��Ndu�'���'\TE�,���K�<?�~�G�+� ��]�����it3��(�.�kJ���}����k��D�i���^�?��<}=`�d���	��O�s��:����h�L'q�H���a�=[�Eaғz���Q��G�j���e��=�O=��,��`I��¹N	q��@	�f��7u6�%/�w�b5����,g:��D��κ�Z/�c%�N����2Fѱ�yZ:����4J��`9c�81�����e�x�Ma�x$r�u�m�2y��^I���N1��Ȓf����IuD���>A;�S;�/_,�|��Dʧ���f�0�	4%2V����ܥ'C��ݜ��M+e3�Z,rS�S�\O݂�&����^a�[��=��&[���GE4e��u�(L:S�qFd�T��KaΙ��p�BV"ӣ�5(��~%�d<<1 �Ȋ�v�_Dƚ�d-�8Y���6�9��R�]s
sc���'�@���\Ndeo�d%��uXdM�
ي��h����Y�e�ss�^2ݽnM�;x�mn�Dְ�����JWP8}�h��x<x��a�D���T�~�,]xlϔ��_\�KdE6��C�邦��v'��wNa���<�d%� v8*L���2�&����0S�U��nlO��Z��b�(Tr*a�(4�g�[�#�X���66�/+��<|����xolVXرC=��K��9�J�/�������[�YUw�т�(Z�oçy��+A��PХ�X�����n}�_����sen�ٟv'ɢ"+d0ay���ǝ�c|.�;./T4��m��N'�b���a�*��R��$I��5u��y8���üiz�}�Y�ᒼͯ�t�%Ui(�q��3����.EH���/?STE�n̼��G�w\%-�q��r�,N��J��T�8$�<O4��[��Ԭ��.�aǡg"�nvz"���Kᔠ'�*Z�!gJԬH���	� '�Z=5���6�d�!��*��fٙ�?��5]�l�r�(b"��q��!fX��&Oaǡ&27����T-�q������c�S�����i�Og�������4�D���D�.��T���U*�3T��9����@N�X�<����z^O���k�����$�����t�dns=&�0��\�ln��_�%I��G�dn����9I&7}�fy&=����ĚM���ZĮ���]��&�{��c>�L�R�&�Q��lCU�ѐ��L75����A۶��/9=�!5hI}������q���yG��I4_n�ԇx����מ����S�@ѐ(Z�X9�;2K�7��(���gI�&x1���x��d|im�,	�&Mx"���J�h��č\�/vC%�ۼ݂o>~�-y��|���L���A[��k�&�3P�xwЦ'�/��$���e-��e٧��Fd�Mh�eO,�.�������R'\m�ܢ	u�?hs6hIe�!�m;-��ʇ|��
��q+g�'n��m�?BN�1݉�M�~�D?F(ʥ�1n�X�c:qs�F]l�jYx�81�#T-���Ɖ�&U5Q2%�qb�$U��I��MUS�8��t�uU�P�]*'n.�n��c&�\�T�dU�J阳;qsd�qb��P�swt9n��Y�t=5�r>q��e�Ĳ��ֈ�������\'&_��\.�\���=S�Ɖ\TUn+���1S�ƉY�~7Q�&�n����r�^�N��m��UU�V�6N�O�3UU��H�7�4UU�n�j=q����	gTM�3͝�ّ�o��M�e��f��ō����ӜTǃ���q]Rov2Z9qs�A��n';��q��;�\׉[ΔK��V��g�QU��r������R8�#�p�Z�=�����{�n\'���ME���t�E��4���T�D
����e'.���!r-���	�t)��y�Ĉ�}�P��֍3��7�}m%M<���ڨ�6�Ցk7���;���55���w�滳��g�pi~��S����ηx�J��*|��D�e\U��ڷ�kӬ��_������S�������+pm���_H���	��_(��׳OTir���b�D:�M�*t��M��k<U�իB'r6Dչ�X��K��d�<g*'vzF���V|��ף�Ή��]��:	"k�pS��w��牞*�ȁ˼]R���y� �Sd{	2��6��
���:g.�vI�t�2|�|�
T/e(���d(�9=3�v�� �5ɷy��Pڳ+F��>�����N����R4��v��G��
J�V��9pY�K��Z5n޸��C�+�ݗ�@iM�mW��\"�R��I��sf;Uu>�%�}�vʥ�:Wr�U�ن����N&�������;#�F�罹�IS����'��^t:Rq�J-�=�W�T(�2v�4D�M��+�(c�7�p�8ԌL�7��3��i��(|�AO��?b\�L� l�f�<�g�	1%z6���:p�Pw����a�zALNy�!E����#��������v����U��y��^���օg��Iq����xuP4%� �w�N�_���*9�4S�jZ��^�JZ��� *�����WI�����x{�Ng�^ol{H����o����8}��T=��W�o�V=��+��a��'o��T�.#��uR��4D�xY�}��z�Ҏez׍4�ېW��f�-|�w���h�������Ք��%BjF^��咛�AG��'T���#]r~����_�t9h�%]w�������a��mg[QL��%:�=�N�˧/�MO��+���Mn�񠭷�5B����m�K�j&�UM&�qհ��    �>]�&l'w�f+�����=lߟ1�	Z:n��t�f�'���z�8cz:n�'���|��9�3$-H1lh��Ɖ!�!�KTG��yh���Gd�Y��*k�MVY�Mٸ7�:�h�nʚUVnz�k������Y�'d-����z�8�;T��t*P�{�[�%��7�
T���z-��m��UUMT�W��3���x�昩�j�z&o���ڸ����G���W)�q��8��Z8ӑ͝�ّ���>��&���	�k�'n�ӫ���z�T��U�+k��u�3��-�킪!0�.w���v���ij����+��m��Y�'�vAՐ���'nw$T��z|c�]�����is�ĭܜ�z�q�t��;�;��ĝq@�9����w�su�q������5�n���y�hxMţkr�~���+8�p/����x�<|(�A�������$|�;���'}698����PQ!�-��l�����J�Bp�����T�l/ȬaH�w�-@���k4���HeW�� �=��(=�0Q.�kW�\�P��_٢Ngv,Ű+p� �}%{)�ҍu)�
�KPZcY��/B�p����-�]���Y!A�@F�k	J�D����࿝�}��+wf]���Ϯ �Cc� ���}-̓�3B��vn���DK�3�|��^����O��/m�&/�|gW�xlNU�fNx�kn��+� �Á$�+��l�}޴����9aq���Z��.q$ċ��^+�Ua��/<���,_����y�?�<�؍����H��#1�_�i ecr_cZ���?�/��[�O��ϣf)��j�V����d���멞�~�W����{��y��1Ϡ�r���![�O�S�R�Ӫ���<��������3�3��552���ϧY��m��M>:s9������k��Ѣ����	���H/�RlkL�#5�(^Qy�I�x!+"�%!�"�x%�޴�dB���{Ǩe�_X��Lp��k�r�D�ޟh5	�Ti�f���p��I���5��,;���&�3���5aV�A�כ�x���G9ZI���<��[��cՆ�M��l���M��l��'"�f�Z)bj6@��43T�u���=��ܮ#��,_�w\�L����iQS�~<}�a�9[YC�{�95a�%+Z��N�o�$E�A��Q��牯Ԟ���E�kf�yIm�|ë�Uq�o�
�7�M81�T�5/�a&��\����-Hp��������ѝ��#O�xC1��|�Y�� |d�6v<*��컝O�&E^ǳ�H���2��vN�8���:���{�6�{/�j�f���^yҾh[��}�i������qQ�Me�(� �L����l��FB��W�I�D[.[��¥87m�H�t��ۈ�̋�H���'�	��ތ�a&�)H��c�@��kN�[F��q�~�7���Ta��+����ᯙ#.�y;_'����k�_n��k�+����O���oh�,`�?E�U�핎��3�ĉs�h:�6��.�&R�]I�b�8�T����'���8TeY�Ox�DWǥ���<ˋ���H|��|�L����i���S
O���4I��"�c�f����������З�
�|<xb�d�[Y����E_�Η,�z.�c�E_����u�D���s��:��𿈾�BĶ�LD�y�Wߟ���|���E�մe�?����[D_};c�g���
}39>+�e�cO��
}��X���B�F�[E_}�c�O=xƾ���~�)�����ۤ�/!;/�.#U�E_��������*.�W�E��e;�������d��΋�����G���T�^зr���/�m��/������ƝaX	�FZ���~�|��r�x3V>(7>�m�͖��]�J/5�tV�O]�ʂ#��xo�EJ���W��ݸc��>?���?����1 �v�"}n�86x�;}l\�æm�w��^�}[�
غ�C{D|��+<O���G���汁;V,Ο�\�yʿۇ�=�<c�qݔ�;���a�_'nw���!P��U]��c�8�-~�=��q�6��G���\��ʫ����7��b*>��y��]e��L8����#!���i�?W0�B'>_�ފ n��?鹂�?���t�ʏ��
pn��u���o�y')邆.�a�$#]�X�m/�LH��ߨu:��Mw�#\AF�>��[<)���0]�c1�j'���o�\��LʸNC�$��:]m�c�4���1S`�$AL|qo�I���$�6TD�!%�0�Ӑ��[~CJ��3�l���H�ih忝d��BK|V~{����2���)�:�3�n���xX8���2�j*L<Ǝ�O�	�:��S&��9�N׃��]%M�+E5�kt}=)�iՔ�_�iH*e���4�@Ι��ԧ������/W�\Z.�������/�:݄�0-��Ze}��a�a���{��BIG7����n�ȭ��y�? ��'�P´�M�dt�m���y����R�Ń6vK���0�bF��bV��*&�l��^�{�/��d�����>��bzFzAL&�_�!���g��t�v+��g漿�ejT+�e��D�_q�-�^^�_C���L6�NC����2���TX��n?�x<qkjz�.��x8���43Ht��9X$bxX�n��x;q��1|~EF��mz.��g�P3aC���\�{h8��Aa:=#��/m�8�L\��T+�u���&��}����0��Vhو�:�Nm�w�Js�*@M*E\��۽�ιu�:J��>��v�q��9É��@V��f�Ӊ[O�>B���)gt���m�k�:2����)�7�I~�� K�k��&�7g`J'݁��(β_N�����J�ډ��ͪ,�3����ͅ2�%�"��u<��y��z�ĭ9�����R��:^N�h�q��Iߡ���Q��3�w��)�*����p;A_���֡�疦�O�n���9�뉛�������z-�iju'nΦ��2�};N��Ȫ�b�����;�N�6Q�G�Z�L�ZO�	���q�扶ASM�f������M���5�Iǡi�u}����}��ū�w{ѾAԐ����T�����}WU��?�\'nY��zdQ�.S���[=.U�q����L��©�:��}��G�H`�+T�_��;�����U�fʓ^������G����Wp��}��+x�����~��&+DT(l��t�`~B�F���߈�&�� �ƙ�Y~� ���*�W"��/�?��[	qz��"�Ob���O<U��)�.A��%����f2��Ckw|(��<�vG�����Cj��_���w�AC�ҚA��o�+@��e��tZs	qz(�Kw'�C�ҚA�n4�&3��
PZS�ؿ �5%�u
9(M��4��E.�c�*�%b��~H#(��V�O���5}�����É[��r"I7:����pM�U͋bY�UM]r	 D��O��ZVN$�I�n}O׉#�D��Q�K:L��t��Hu�b+��B~�J�΃K��X���t�&�����+��Ǥ�@�F��Ȏ�q8<�6���B�p�ZH�2�;d��5�R�pX�X�n�z�u`��ۨ�>H���$փ{���a�0ƌ�-��J=�p^?$nx@^
kc(H���XXx^�#�J8|�c'��t=hۗ�4�l���TGV��p���\B�J;�k�P!j��W�m�KMJs턤�/���
�Qmm�n:G�f6�Y����A� :��\���l�JKJS#�AN��a�^�� C�)�����tM�t�z�|� ������xA����x8qk�7^��E���%f��W>qk�<^e�7*,�Ƞ���M�ܵp���J)�O�.,��Sѩ����N�p�oT���M]8g���Y���N��z���<�m�x�p��>��9e}��0�CY︾�'na�,+�'n��ѷ��h�fcõ*P�􆉺�����)U���[������!-��A�-��r��@�l��Hhg�H�N�\,���0� ����É[�4;�x���pJ�a˗��Bb���*��]c�ȑ���~��	�j������p&AY* �  !J����tFrg]�r2�CWM�a5���YWU��&��ǹh"J���:+k�x>��N���
����:y.A����
*k?gĜ��Tj��g4���<c�
_����'�(�h����<c_�����T��c�D�Ě��n34.\~�^"���Tv��V��ؙ\���Bk��U�f�jg�%U��5��_�Ҟ�J�^z(M�W(���<>6(�	[�_h�@�Ԡ�g�
Mm.aK� ��t*�B:+0.A�Ď�V�P{�G��c�G��ޮ��.v9꣩<������J����G��Y����FՈ��>�+�(�SX��:��F=�h�rhe���A���>F��� !�<���Ҫ��l�U4)^ټّ�c�k�|�ˆ%�T׹�kI�
����GP��N��+߄�,%aH=��K�B�k�3E�]֑N�EO_F?>�N���4d�W�(���闗b�a� VɅW��G#j�,>'�TPMq҇V�]"œ��Hɖ2�݆�o�K�D^�e�b��Dy��)��#J��_��O����Z��J3��9�t=c�%m�gT�{�mڿ6��'�M����B8�;~k�ߪRH{��7�������re]#���#�J��]kΕ��	Gn��fa�	=ɹ�|��.�-w�gz��t��[e�{Yq���p�g��y���*$�UԍPr^�W�^P]E����h���J� 界Bڙ\:+�Ȋfr��;e��<�D&�G�% �&f1&�0�';w��J�>��)Ǎ�K�"s�0�A��<��;,�b%��t:�A�Ƹ(Y�w\�J"[M�ELM�rc'E<�:N��)ER��HL�"��e1N@�$bjb55�����DNM�btb�L #��:%!%�J����.9��卖i+/�s;�hIݱ���z�%a�δ��"9B�����+ӊ��<��i��,�@��sq.e��V8O��R#��[i���8Y.me�ӏ$WaR���2�9��_ܥ�H�v�3$]ob]F����,��"z21kR-w(sF���a�MF*Qa�G
�d��"ZRkR)���"::&�H*��c��Js�S��8ĘnT�Sӷ��T��TED��lJU�L��TEA:n�ڦ*"z��ED�ۻTG��s��=�Ǽ'��ЮUa��_��Gڧ�5i�����^����͙�;��f��E���a�ǣ[�'��=ֱf��K3<�`�Kӌ΍�L�4\�y�&���c����ˁ��ΗY��W K�p�*�}��АP��'T�DH6�I�DI�Ni
s�;��%Ƹs
S�G�5]����c���E��fBP.+v�!(���3 \U�4.�f���{��F#�&���^������ESO�+^����¤�P�0j��0i\����<\
s�ԤV��&����3���ʖ0>��f�����}�]��� ��T��F)���s(B#Y�8y5>YC��|=*�U�O��6�|r�󣸧��`^��H�VȒ�x~��ҧu/|b�	��s��7I�����,x�Bf�{.J��/��bۯ���ig9�w_#���Kߧ
P�_H8��g*�6'U�Q]�����C�~��z4�U���Sa~a;��Սt�@V�Pس
g(�f��4�W2��W���{J��~8+x�r`�S��jPirN���D�7!���!���d����2a���
TN�\��
�)Frq'n����3ظ
���ho���c$��a���$��|V�_ ~�QVnĕ�Ra�lN�����\��[lPU_��������
LհjpC���
��arM'nѪS8�M.�ـ�\�j@;q[�v=7��!q��h~U��s����
�HvZ�;O�L��[zn��oS}�޲*0r�z�\�ٟ{�\�n�.�r��M
�-W��s�{��N�lo��s��*�N��]ʕW"�R�T��M�r�U��B����9������pU�	�����Ο����j�t�1�\|�`��K'n.���5����y6��
�%���\�~��N�n���`L?���侺݃(�\��G��#����)m�����;y��+�g��0�cmx��4*�����@7��p��G�D�+C� 1���p;@L$��?S�D2+#�X	٬,�٬����f�9�فCL���?SR��tV�I�J���1�-BN䳺6X"�{&�\�Dȉ|V�_�9�tS%BM䏲lC��y5gB(+DK���,b���	Z�=���U��T���AC��X�<K
'�XA������%%�L���2h��BIEh*+KI��mOh�9�ڴ-a���W"K�8u5�wޟ�m>~1q����m�Np��?R$�w$���=�$�~�n�ބFH������O�7\�|7�H��x���-�(�iжm���	�ă6's����|�㐓
�_J=h�q���.Zj��՝���
95͆�COM�a�K�'nvL���f��o�P�K�Qj9q�gt�F���%&Hzi׉��4U��kQ�?qۺ�Z8�j�dK'o{Y5�i���9�t��Vcۉ[���j��!\/�ʥ��t���c�^��SC�^����BV�-���'o����`�r���5
ꥲʺ�+je.�չ7��T��Y��������Ŀ�������;��u���+@��Jo|���U�x�����YA�xG�G�J���;+0��Q���$Q��K�"*4���O�Y��^=�.��l��%�zȬ��?�<Հ��݊�^��p�_>�z���
vl� t
l�"�R<+0�����g~"��F@��_�gbx��p�!jT�+�Rtg� �;�6ܝw�R��E�{h���:���/Bi_X�������?U��!�f�`y���9W��=�&;���]�*Q��dE���[%�w\��-��3|�JP︢�[�#��� ��;����q���?���^%�w�P���5�M5R�e�����_34���F7fw����5CT��n��!�Fl7>ȭ������������z9q�ED�*l�Ra�\������a]���憾@WwD;�Yh
t���Y}✁�������UC��o��U����@UoX�P�_�;��r����6޲>#G�n3�qU�����/P�D���_v���q�z�7�����_�K<�'�	/�?n5��������K��!`;#����e� �q�gt�����/a_�p�ʅ6��n�5�r���UD5��Y%����v���η�6jд+n��Y�����o�vAX'c��>�e]�f`����ø�������m�\�8�D�;�Kdo.<��N�M\��|�L���Z�S}ٟ��	�^���7���O}9}8x�?=�E�rs1������/M��r��B�<�����v�μ_h�"��ޠ����g�O�� }=�>�x�Ξ�A�M�^!<�?���1ԃ'�KP}u�٢�[I�<1���۸��/bm�ף���8#��@
L����d���dD���)�lI�	O�l��K�%�
d�ޖ<*�u[
���9ET �ݶ��p�-A�L72k�Ws�%��F~m	B�qY[�҉r�h�7I3p��8��|W��� _d[H�<G�l9,~~L�F����	��B�p��o��W8-X�t�}�����u9��~B}�����Z���ٟ�u�;�h�\O�K���j6�'�-R����K1j�r-DBnΡ�� �^���G�<)���l�?�ccu����khz��G�V|�3|��Ji�ފ��J>�q�����C�LӍ�y]#)f(�Vꂖ��\��Բ�';�m�C@�_��_���������?������w�����F�[      _   z   x�=�A
�0��W�A��&=�F�B���@(���U�mv� 11-��!
Ó���֔��۶�`�4����?^��Ǽ���?悑�q�0u��oI�}���ŕ]!l����,A�&| ?�a"�     